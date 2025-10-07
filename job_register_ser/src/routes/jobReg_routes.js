const express = require("express");
const {
  upsertJobRegLockedCost,
} = require("../service/jobStatusService_service");

const router = express.Router();

/**
 * POST - Insert or Update jobReg records (handles single or multiple)
 */
router.post("/jobReg", async (req, res) => {
  try {
    const { costLockData } = req.body;

    // Validate that costLockData is an array
    if (
      !costLockData ||
      !Array.isArray(costLockData) ||
      costLockData.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "costLockData must be a non-empty array",
      });
    }

    // Validate each record in the array
    for (let i = 0; i < costLockData.length; i++) {
      const record = costLockData[i];
      const {
        voucherNo,
        iHeaderId,
        jobId,
        jobName,
        jobCode,
        costLocked,
        companyCode,
      } = record;

      if (
        !voucherNo ||
        !iHeaderId ||
        !jobId ||
        !jobName ||
        !jobCode ||
        costLocked === undefined ||
        costLocked === null ||
        !companyCode
      ) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields in record ${
            i + 1
          }: jobId, voucherNo, iHeaderId ,jobName, jobCode, costLocked, companyCode`,
        });
      }
    }

    // Process batch operation (works for 1 or many records)
    const result = await upsertJobRegLockedCost(costLockData);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error in POST /jobReg:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to process job registration",
      error: err.message,
    });
  }
});

module.exports = router;
