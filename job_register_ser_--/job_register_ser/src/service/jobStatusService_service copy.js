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
async function upsertJobRegLockedCost(data, companyCode) {
  try {
    const pool = await getConnection(companyCode);
    const tableName = "EX_JobRegLockedCost";

    // Check if table exists, create if not
    const tableExists = await checkTableExists(tableName, companyCode);
    if (!tableExists) {
      await createEX_JobRegLockedCost(companyCode);
    }

    // Use MERGE statement for upsert operation
    const upsertQuery = `
      MERGE EX_JobRegLockedCost AS target
      USING (SELECT @jobId as jobId, @voucherNo as voucherNo) AS source
      ON (target.jobId = source.jobId AND target.voucherNo = source.voucherNo)
      WHEN MATCHED THEN
        UPDATE SET 
          jobName = @jobName,
          jobCode = @jobCode,
          costLocked = @costLocked,
          Created_Date = GETDATE()
      WHEN NOT MATCHED THEN
        INSERT (voucherNo, jobId, jobName, jobCode, costLocked)
        VALUES (@voucherNo, @jobId, @jobName, @jobCode, @costLocked);
    `;

    const result = await pool
      .request()
      .input("voucherNo", data.voucherNo)
      .input("jobId", data.jobId) // INT parameter
      .input("jobName", data.jobName)
      .input("jobCode", data.jobCode)
      .input("costLocked", data.costLocked || 0) // BIT: Default to 0 (false)
      .query(upsertQuery);

    console.log(
      `=> Job cost lock status processed for Job ID: ${data.jobId}, Voucher: ${data.voucherNo}`
    );
    return {
      success: true,
      message: "Record processed successfully",
      operation: "upsert",
      jobId: data.jobId,
    };
  } catch (err) {
    console.error("❌ Error processing job cost lock status:", err.message);
    throw err;
  }
}

module.exports = {
  upsertJobRegLockedCost,
};
