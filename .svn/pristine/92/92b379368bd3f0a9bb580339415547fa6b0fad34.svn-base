import React, { useContext, useEffect, useState } from "react";
import { JobContext } from "../../context/JobContext";
import { focusFetchDataFromApi } from "../../services/focusFetchAPI";
import "../../styles/moveCost.css";
import { generateJobOrderChargesExcel } from "../../utils/generateJobOrdersExcel";

function JobOrders() {
  const { sessionId, selectedJob, setIsLoading } = useContext(JobContext);
  const [jobOrderData, setJobOrderData] = useState([]);

  useEffect(() => {
    fetchJobOrders();
  }, []);

  const fetchJobOrders = async () => {
    const jobOrderQuery = `
      SELECT 
        ISNULL(eh.JobOrderChargesId, 0) AS chargeId,
        ISNULL(ctu.ChargeTypeId, 0) AS chargeTypeId,
        ISNULL(ind.mGross, 0) AS amount,
        ISNULL(eb.sRemarks, '') AS chargeDescription,
        ISNULL(ABS(ind.fQuantity), 0) AS quantity,
        ISNULL(ind.mRate, 0) AS unitPrice,
        ISNULL(bsd.Taxable, 0) AS priceExclVat,
        ISNULL(bsd.VAT, 0) AS vat,
        ISNULL(bsd.[VAT Amount], 0) AS vatAmount,
        ISNULL(h.fNet, 0) AS totalIncludingVAT,
        CASE WHEN ISNULL(eh.InActive, 0) = 0 THEN 'False' ELSE 'True' END AS inActive,
        ISNULL(eh.UpdatedByUserId, 0) AS updatedByUserId,
        CONVERT(nvarchar, dbo.IntToDate(ISNULL(eh.DateUpdated, 0)), 103) AS dateUpdated,
        ISNULL(cu.iCurrencyId, 0) AS currencyId,
        ISNULL(cu.sCode, '') AS currency_code,
        ISNULL(eh.UpdatedByUserId, '') AS updateByUserId,
        ISNULL(eh.UpdatedbyUserName, '') AS updateByUser,
        ISNULL(bsd.[Buying rate], 0) AS buyingRate,
        ISNULL(eh.CodeName, '') AS codeName,
        ISNULL(ctu.NewChargeTypeId, '') AS newChargeTypeId,
        ISNULL(ct.sCode, '') AS newChargeTypeCode,
        ISNULL(p.sName, '') AS Item,
        ISNULL(tc.sName, '') AS taxCode
      FROM tCore_Header_0 h
      JOIN tCore_HeaderData2568_0 eh ON eh.iHeaderId = h.iHeaderId
      JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
      JOIN tCore_Indta_0 ind ON ind.iBodyId = d.iBodyId
      JOIN vCore_BodyScreenData_0 bsd ON bsd.iBodyId = d.iBodyId
      LEFT JOIN mCore_Product p ON p.iMasterId = ind.iProduct
      LEFT JOIN tCore_Data2568_0 eb ON eb.iBodyId = d.iBodyId
      LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
      LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
      LEFT JOIN mCore_newchargetype ct ON ct.iMasterId = t.iTag3036
      LEFT JOIN muCore_newchargetype ctu ON ctu.iMasterId = t.iTag3036
      LEFT JOIN mCore_Currency cu ON cu.iCurrencyId = d.iCurrencyId
      LEFT JOIN mCore_TaxCode tc ON tc.iMasterId = eb.TaxCode
      WHERE h.iVoucherType IN (2568)
        AND d.iMainBodyId = 0
        AND t.iTag3008 = ${selectedJob.jobId}
    `;

    const requestData = {
      data: [{ Query: jobOrderQuery }],
    };

    try {
      const response = await focusFetchDataFromApi(
        "utility/executesqlquery",
        requestData,
        sessionId,
        setIsLoading
      );

      if (response?.result === 1 && response?.data?.[0]?.Table?.length > 0) {
        setJobOrderData(response.data[0].Table);
      } else {
        console.warn("No Job Orders found.");
        setJobOrderData([]);
      }
    } catch (error) {
      console.error("Error fetching Job Orders:", error);
      setJobOrderData([]);
    }
  };

  const onExport = async () => {
    // Export logic here
    if (jobOrderData.length === 0) {
      alert("No data available for export.");
      return;
    }

    generateJobOrderChargesExcel(jobOrderData);
  };

  return (
    <div className="charges-tab">
      <h7
        style={{ color: "#44799b", fontWeight: "bold", marginBottom: "10px" }}
      >
        Job Order Charges
      </h7>
      {jobOrderData.length > 0 && (
        <button
          className="btn btn_post"
          onClick={onExport}
          style={{
            position: "absolute",
            right: "20px",
            // // background: "transparent",
            // border: "none",
            // fontSize: "18px",
            cursor: "pointer",
            // color: "#333",
          }}
        >
          Export to Excel
        </button>
      )}

      {jobOrderData.length > 0 ? (
        <div
          style={{ overflowX: "auto", maxHeight: "75vh", marginTop: "20px" }}
        >
          <table className="job-table" style={{ width: "max-content" }}>
            <thead>
              <tr>
                <th>chargeId</th>
                <th>chargeTypeId</th>
                <th>amount</th>
                <th>chargeDescription</th>
                <th>quantity</th>
                <th>unitPrice</th>
                <th>priceExclVat</th>
                <th>vat</th>
                <th>vatAmount</th>
                <th>totalIncludingVAT</th>
                <th>inActive</th>
                <th>updatedByUserId</th>
                <th>dateUpdated</th>
                <th>currencyId</th>
                <th>currency_code</th>
                <th>updateByUserId</th>
                <th>updateByUser</th>
                <th>buyingRate</th>
                <th>codeName</th>
                <th>newChargeTypeId</th>
                <th>newChargeTypeCode</th>
                <th>Item</th>
                <th>Tax Code</th>
              </tr>
            </thead>
            <tbody>
              {jobOrderData.map((entry, index) => (
                <tr
                  key={index}
                  className={`tr-tablerow ${
                    index % 2 === 0 ? "even-row" : "odd-row"
                  }`}
                >
                  <td className="text-align-right">{entry.chargeId}</td>
                  <td className="text-align-right">{entry.chargeTypeId}</td>
                  <td className="text-align-right">{entry.amount}</td>
                  <td>{entry.chargeDescription}</td>
                  <td className="text-align-right">{entry.quantity}</td>
                  <td className="text-align-right">{entry.unitPrice}</td>
                  <td className="text-align-right">{entry.priceExclVat}</td>
                  <td className="text-align-right">{entry.vat}</td>
                  <td className="text-align-right">{entry.vatAmount}</td>
                  <td className="text-align-right">
                    {entry.totalIncludingVAT}
                  </td>
                  <td>{entry.inActive}</td>
                  <td>{entry.updatedByUserId}</td>
                  <td>{entry.dateUpdated}</td>
                  <td className="text-align-right">{entry.currencyId}</td>
                  <td>{entry.currency_code}</td>
                  <td>{entry.updateByUserId}</td>
                  <td>{entry.updateByUser}</td>
                  <td className="text-align-right">{entry.buyingRate}</td>
                  <td>{entry.codeName}</td>
                  <td className="text-align-right">{entry.newChargeTypeId}</td>
                  <td>{entry.newChargeTypeCode}</td>
                  <td>{entry.Item}</td>
                  <td>{entry.taxCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ fontWeight: "bold" }}>
          No job orders found for the selected job.
        </p>
      )}
    </div>
  );
}

export default JobOrders;
