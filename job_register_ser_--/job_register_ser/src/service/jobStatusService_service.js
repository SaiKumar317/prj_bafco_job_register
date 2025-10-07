const { getConnection } = require("../config/dbConfig");

// Step 1: Check table exist or NOT

/**
 * Check if table exists in database
 */
async function checkTableExists(tableName, companyCode) {
  try {
    const pool = await getConnection(companyCode);
    const query = `
      SELECT COUNT(*) as count 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = @tableName
    `;

    const result = await pool
      .request()
      .input("tableName", tableName)
      .query(query);

    return result.recordset[0].count > 0;
  } catch (err) {
    console.error("❌ Error checking table existence:", err.message);
    throw err;
  }
}

/**
 * Create the jobRegLockedCost status table with Status as INT
 */
async function createEX_JobRegLockedCost(companyCode) {
  try {
    const pool = await getConnection(companyCode);
    const createTableQuery = `
      CREATE TABLE EX_JobRegLockedCost (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        voucherNo VARCHAR(200) NOT NULL,
        iHeaderId INT NOT NULL,
        jobId INT NOT NULL,
        jobName VARCHAR(200) NOT NULL,
        jobCode VARCHAR(200) NOT NULL,
        costLocked BIT NOT NULL,
        Created_Date DATETIME DEFAULT GETDATE()
      )
    `;

    await pool.request().query(createTableQuery);
    console.log("✅ Table EX_JobRegLockedCost created successfully");
    return true;
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
    throw err;
  }
}

// Inserting and updating data
async function upsertJobRegLockedCost(costLockDataArray) {
  try {
    const results = [];
    const errors = [];

    // Group records by companyCode to optimize database connections
    const recordsByCompany = {};

    costLockDataArray.forEach((record, index) => {
      const { companyCode } = record;
      if (!recordsByCompany[companyCode]) {
        recordsByCompany[companyCode] = [];
      }
      recordsByCompany[companyCode].push({ ...record, originalIndex: index });
    });

    // Process each company's records
    for (const [companyCode, records] of Object.entries(recordsByCompany)) {
      try {
        const pool = await getConnection(companyCode);
        const tableName = "EX_JobRegLockedCost";

        // Check if table exists, create if not (once per company)
        const tableExists = await checkTableExists(tableName, companyCode);
        if (!tableExists) {
          await createEX_JobRegLockedCost(companyCode);
        }

        // Process each record for this company
        for (const record of records) {
          try {
            const data = {
              voucherNo: record.voucherNo,
              iHeaderId: record.iHeaderId ? parseInt(record.iHeaderId) : 0,
              jobId: parseInt(record.jobId),
              jobName: record.jobName,
              jobCode: record.jobCode,
              costLocked: record.costLocked ? parseInt(record.costLocked) : 0,
            };

            const upsertQuery = `
  MERGE EX_JobRegLockedCost AS target
  USING (SELECT @jobId as jobId) AS source
  ON (target.jobId = source.jobId)
  WHEN MATCHED THEN
    UPDATE SET 
      voucherNo = @voucherNo,
      iHeaderId = @iHeaderId,
      jobName = @jobName,
      jobCode = @jobCode,
      costLocked = @costLocked,
      Created_Date = GETDATE()
  WHEN NOT MATCHED THEN
    INSERT (voucherNo, iHeaderId, jobId, jobName, jobCode, costLocked)
    VALUES (@voucherNo, @iHeaderId, @jobId, @jobName, @jobCode, @costLocked);
`;

            await pool
              .request()
              .input("voucherNo", data.voucherNo)
              .input("iHeaderId", data.iHeaderId)
              .input("jobId", data.jobId)
              .input("jobName", data.jobName)
              .input("jobCode", data.jobCode)
              .input("costLocked", data.costLocked)
              .query(upsertQuery);

            results.push({
              success: true,
              jobId: data.jobId,
              voucherNo: data.voucherNo,
              iHeaderId: data.iHeaderId,
              companyCode: companyCode,
              originalIndex: record.originalIndex,
            });

            console.log(
              `✅ Processed Job ID: ${data.jobId}, Voucher: ${data.voucherNo}, Company: ${companyCode}`
            );
          } catch (recordError) {
            console.error(
              `❌ Error processing record ${record.originalIndex}:`,
              recordError.message
            );
            errors.push({
              success: false,
              jobId: record.jobId,
              voucherNo: record.voucherNo,
              iHeaderId: record.iHeaderId,
              companyCode: companyCode,
              originalIndex: record.originalIndex,
              error: recordError.message,
            });
          }
        }
      } catch (companyError) {
        console.error(
          `❌ Error processing company ${companyCode}:`,
          companyError.message
        );
        // Add errors for all records of this company
        records.forEach(record => {
          errors.push({
            success: false,
            jobId: record.jobId,
            voucherNo: record.voucherNo,
            iheaderId: record.iHeaderId,
            companyCode: companyCode,
            originalIndex: record.originalIndex,
            error: companyError.message,
          });
        });
      }
    }

    const totalProcessed = results.length + errors.length;
    const successCount = results.length;
    const errorCount = errors.length;

    return {
      success: errorCount === 0,
      message: `Processing completed: ${successCount}/${totalProcessed} records processed successfully`,
      totalRecords: totalProcessed,
      successCount: successCount,
      errorCount: errorCount,
      results: results,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (err) {
    console.error("❌ Error in processing:", err.message);
    throw err;
  }
}

module.exports = {
  upsertJobRegLockedCost,
};
