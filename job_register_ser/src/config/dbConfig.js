const sql = require("mssql");
const { getDbConfigFromXml } = require("./dbConfigParser");

// Store multiple pools for different company codes
const pools = new Map();

/**
 * Get or create SQL connection pool for specific company
 */
async function getConnection(companyCode) {
  // If no company code provided, throw error
  if (!companyCode) {
    throw new Error("❌ Company code is required for database connection");
  }

  // Check if pool already exists for this company code
  if (pools.has(companyCode)) {
    return pools.get(companyCode);
  }

  const config = await getDbConfigFromXml(companyCode);

  try {
    const pool = await sql.connect(config);
    console.log(
      `✅ Connected to SQL Server: ${config.server} / ${config.database}`
    );

    // Store the pool for this company code
    pools.set(companyCode, pool);
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    throw err;
  }
}

module.exports = { getConnection };
