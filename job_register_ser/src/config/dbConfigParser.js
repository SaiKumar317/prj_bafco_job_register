const fs = require("fs");
const xml2js = require("xml2js");

const xmlFilePath = process.env.xmlFilePath;

/**
 * Reads and parses the DBConfig.xml and merges with COMPANY_CODE
 */
async function getDbConfigFromXml(companyCode) {
  const xml = fs.readFileSync(xmlFilePath, "utf-8");
  // Use parameter companyCode, fallback to env if not provided
  const finalCompanyCode = companyCode

  // Default parser → keeps values as arrays
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);

  // Database nodes are always arrays
  const databases = result.DatabaseConfig.Database;

  // Find the active SQLServer config
  const sqlServerDb = databases.find(
    db => db.$.Type === "SQLServer" && db.$.Active === "1"
  );

  if (!sqlServerDb) {
    throw new Error("❌ No active SQLServer database found in DBConfig.xml");
  }

  // Extract values
  const {
    Data_Source: [dataSource],
    Initial_Catalog: [initialCatalog],
    User_Id: [userId],
    Password: [password],
  } = sqlServerDb;

  const finalConfig = {
    user: userId,
    password: password,
    server: dataSource,
    database: `${initialCatalog}${finalCompanyCode}`, // Fixed typo
    requestTimeout: 600000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 300000,
    },
    options: {
      encrypt: false,
      trustServerCertificate: true,
      cryptoCredentialsDetails: {
        minVersion: "TLSv1",
      },
    },
  };

  console.log("🔧 Final Config:", {
    ...finalConfig,
    password: "***", // Hide password in logs
  });

  return finalConfig;
}

module.exports = { getDbConfigFromXml };
