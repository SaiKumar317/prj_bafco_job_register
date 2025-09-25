import React, { useEffect, useContext, useState } from "react";
import Select from "react-select";
import "../../styles/moveCost.css";
import { JobContext } from "../../context/JobContext";
import { focusFetchDataFromApi } from "../../services/focusFetchAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 13,
    width: "250px",
  }),
  //  "dropdown-content": (provided) => ({ ...provided }),

  control: (provided) => ({
    ...provided,
    borderColor: "#868e96",
    width: "250px",
    paddingLeft: "3px",
    // zIndex: 9,
    // Add custom styles for the control (container)
    // border color on focus and active state
    boxShadow: "none", // Remove default box shadow
    "&:hover": { borderColor: "#44799b" },
  }),
  // input styles
  input: (provided) => ({
    ...provided,
    // Add custom styles for the input
    // color: "red", // Change the text color to red as an example
    fontSize: "13px", // Set the font size
    fontWeight: "400", // Set the font weight
    // zIndex: 9,
    width: "150px",
    // paddingLeft: "3px",
    border: "none",
  }),

  singleValue: (provided) => ({
    ...provided,
    // Add custom styles for the selected value
    color: "black", // Change the text color to red as an example
    fontSize: "13px", // Set the font size
    fontWeight: "400", // Set the font weight
  }),
  option: (provided, state) => ({
    ...provided,
    // zIndex: 9,
    color: state.isSelected ? "black" : "black", // Text color based on selection
    backgroundColor: state.isSelected ? "#c6def5" : "#f8f9fa", // Background color based on selection
    "&:hover": {
      backgroundColor: state.isSelected ? "#dce7f2" : "#e2e6ea", // Change hover background based on selection
      color: "black", // Text color on hover
    },
  }),
};

function GotoInvoice() {
  const [selectedTaxInv, setSelectedTaxInv] = React.useState(null);
  const [taxInvoiceData, setTaxInvoiceData] = React.useState([]);

  const {
    sessionId,
    setIsLoading,
    selectedJob,
    fetchCostEntryDetails,
    costDate,
  } = useContext(JobContext); // get sessionId from context

  const [taxInvOptions, setTaxInvOptions] = useState([]);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);

  useEffect(() => {
    fetchTaxInvDetails();
  }, []);

  const fetchTaxInvDetails = async () => {
    const taxInvQuery = `
      SELECT 
    h.iHeaderId value,
    MAX(h.sVoucherNo) AS label,
    MAX(CONVERT(nvarchar, dbo.IntToDate(h.iDate), 103)) AS docDate,
    MAX(ISNULL(ca.sName, '')) AS customerAcc,
    MAX(ISNULL(ca.sCode, '')) AS customerCode,
    MAX(ISNULL(sm.sName, '')) AS salesMan,
    MAX(ISNULL(sm.sCode, '')) AS salesManCode,
    MAX(ISNULL(gt.sName, '')) AS cargoDescription,
    SUM(ISNULL(ind.mGross, 0)) AS serviceAmount,
    SUM(ISNULL(bsd.[VAT Amount], 0)) AS taxAmount,
    SUM(ISNULL(ABS(h.fNet), 0)) AS finalInvoice
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind ON ind.iBodyId = d.iBodyId
JOIN vCore_BodyScreenData_0 bsd ON bsd.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN mCore_Account ca ON ca.iMasterId = d.iBookNo
LEFT JOIN mCore_salesman sm ON sm.iMasterId = t.iTag3010
LEFT JOIN mCore_goodstype gt ON gt.iMasterId = t.iTag3015
WHERE h.iVoucherType = 3332 and t.iTag3008 = ${selectedJob.jobId} --and  h.iDate = dbo.dateToInt('${costDate}')
GROUP BY h.iHeaderId;
    `;
    const taxInvReqData = {
      data: [{ Query: taxInvQuery }],
    };

    try {
      const taxInvResponse = await focusFetchDataFromApi(
        "utility/executesqlquery",
        taxInvReqData,
        sessionId,
        setIsLoading
      );

      if (
        taxInvResponse &&
        taxInvResponse.result === 1 &&
        taxInvResponse.data?.[0]?.Table?.length > 0
      ) {
        setTaxInvOptions(taxInvResponse.data[0].Table);
      } else {
        console.warn("No Tax Invoice data found.");
        setTaxInvOptions([]);
      }
    } catch (error) {
      console.error("Error fetching Tax Invoice details:", error);
      setTaxInvOptions([]);
    }
  };

  const handleSelectTaxInv = (selectedOption) => {
    setSelectedTaxInv(selectedOption);
    console.log("handleSelectTaxInv", selectedOption);
    // Handle job selection logic here
  };

  const handleGoToInv = async () => {
    if (!selectedTaxInv) {
      alert("Please select Tax Invoice");
      return;
    }

    const taxInvoiceDetailsQuery = `SELECT 
distinct h.sVoucherNo documentNo,
convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
ISNULL(ca.sName, '') AS customerAcc,
ISNULL(ca.sCode, '') AS customerCode,
ISNULL(sm.sName, '') AS salesMan,
ISNULL(sm.sCode, '') AS salesManCode,
ISNULL(gt.sName, '') AS cargoDescription,
ISNULL(p.sCode, '') AS serviceId,
ISNULL(eb.Description, '') AS description,
ISNULL(abs(ind.fQuantity), 0) AS fQuantity,
ISNULL(ind.mRate, 0) mRate,
ISNULL(ct.sName, '') AS containerType,
ISNULL(ind.mGross, 0) AS mGross,
ISNULL(bsd.[VAT Amount], 0) AS taxAmount,
ISNULL(h.fNet,0) AS finalInvoice,
ISNULL(t.iTag3008, 0) AS jobId,
ISNULL(j.sName, '') AS jobName,
ISNULL(j.sCode, '') AS jobCode,
ISNULL(cu.sCode, '') AS currency,
CASE WHEN (select iValue as iBaseCurrencyId from cCore_PreferenceVal_0 With(Readuncommitted) where iCategory=4 and iFieldId=10) =cu.iCurrencyId then 1 
else ISNULL(df.fExchangeRate,0) end fExchangeRate,
ISNULL(bsd.VAT,0) taxPer,
d.iBodyId
FROM tCore_Header_0 h
JOIN tCore_HeaderData3332_0 eh ON eh.iHeaderId = h.iHeaderId
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
LEFT JOIN tCore_Data3332_0 eb ON eb.iBodyId = d.iBodyId
JOIN vCore_BodyScreenData_0 bsd on bsd.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_Tags_0 t ON t.iBodyId = d.iBodyId
LEFT JOIN tCore_Data_FX_0 df ON df.iBodyId = d.iBodyId
LEFT JOIN mCore_Product p ON p.iMasterId = ind.iProduct
LEFT JOIN mCore_joborder j ON j.iMasterId = t.iTag3008
LEFT JOIN mCore_Account ca on ca.iMasterId = d.iBookNo
LEFT JOIN mCore_salesman sm on sm.iMasterId = t.iTag3010
LEFT JOIN mCore_goodstype gt on gt.iMasterId = t.iTag3015
LEFT JOIN mCore_containertype ct on ct.iMasterId = t.iTag3019
LEFT JOIN mCore_Currency cu on cu.iCurrencyId = d.iCurrencyId
WHERE h.iVoucherType IN (3332)--Tax Invoice
and d.iMainBodyId = 0 and t.iTag3008 = ${selectedJob.jobId} --and  h.iDate = dbo.dateToInt('${costDate}') 
and h.sVoucherNo = '${selectedTaxInv.label}'`;

    const taxInvoiceRequestData = {
      data: [
        {
          Query: `${taxInvoiceDetailsQuery}`,
        },
      ],
    };

    const taxInvoiceResponse = await focusFetchDataFromApi(
      "utility/executesqlquery",
      taxInvoiceRequestData,
      sessionId,
      setIsLoading
    );

    if (taxInvoiceResponse.error) {
      console.error("Error fetching Tax Invoice:", taxInvoiceResponse.error);
      alert(
        `Error fetching Tax Invoice: ${
          taxInvoiceResponse?.error?.message || taxInvoiceResponse.error
        }`
      );
      return;
    }
    if (
      taxInvoiceResponse &&
      taxInvoiceResponse?.data &&
      taxInvoiceResponse?.result === 1 &&
      taxInvoiceResponse?.data[0].Table &&
      taxInvoiceResponse?.data[0].Table.length > 0
    ) {
      const taxInvoiceDetails = taxInvoiceResponse?.data[0].Table || [];
      console.log("taxInvoiceDetails:", taxInvoiceDetails);
      setTaxInvoiceData(taxInvoiceDetails);
      setShowInvoiceDetails(true);
    }
  };

  const handleBackClick = () => {
    setShowInvoiceDetails(false);
    setSelectedTaxInv(null);
    setTaxInvoiceData([]);
  };

  return (
    <div className="">
      {taxInvoiceData.length > 0 ? (
        <div
          style={{
            position: "relative",
            padding: "10px",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
          }}
        >
          {/* ❌ Cross Icon Button */}
          <button
            className="btn btn_post"
            onClick={() => setTaxInvoiceData([])}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              // // background: "transparent",
              // border: "none",
              // fontSize: "18px",
              cursor: "pointer",
              // color: "#333",
            }}
          >
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: "0px" }} />
            {/* Close */}
          </button>

          {/* Optional Header */}
          <h6
            style={{
              marginTop: "0",
              marginBottom: "10px",
              color: "#44799b",
              fontWeight: "bold",
            }}
          >
            Invoice Details
          </h6>
          <div className="filters-bar">
            <div className="filter-group">
              <label htmlFor="invoice-id">Invoice Id</label>
              <input
                className="input-field"
                id="invoice-id"
                type="text"
                readOnly
                value={selectedTaxInv?.label}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="inv-date">Date</label>
              <input
                className="input-field"
                id="inv-date"
                type="text"
                readOnly
                value={selectedTaxInv?.docDate}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="cust-name">Customer Name</label>
              <input
                className="input-field"
                id="cust-name"
                type="text"
                readOnly
                value={selectedTaxInv?.customerAcc}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="cust-code">Customer Code</label>
              <input
                className="input-field"
                id="cust-code"
                type="text"
                readOnly
                value={selectedTaxInv?.customerCode}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="salesman">Salesman</label>
              <input
                className="input-field"
                id="salesman"
                type="text"
                readOnly
                value={selectedTaxInv?.salesMan}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="service-amt">Service Amount</label>
              <input
                className="input-field"
                id="service-amt"
                type="text"
                readOnly
                value={selectedTaxInv?.serviceAmount}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="tax-amt">Tax Amount</label>
              <input
                className="input-field"
                id="tax-amt"
                type="text"
                readOnly
                value={selectedTaxInv?.taxAmount}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="inv-total">Final Invoice Total</label>
              <input
                className="input-field"
                id="inv-total"
                type="text"
                readOnly
                value={selectedTaxInv?.finalInvoice}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="cargo-des">Cargo Description</label>
              <input
                className="input-field"
                id="cargo-des"
                type="text"
                readOnly
                value={selectedTaxInv?.cargoDescription}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto", maxHeight: "75vh" }}>
            <table className="job-table">
              <thead>
                <tr>
                  <th>Service Id</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Type</th>
                  <th>Rate</th>
                  <th>Currency</th>
                  <th>Exchange Rate</th>
                  <th>Tax%</th>
                  <th>Tax Amount</th>
                  <th>Sale Amount</th>
                </tr>
              </thead>
              <tbody>
                {taxInvoiceData.map((entry, index) => (
                  <tr
                    key={index}
                    className={`tr-tablerow ${
                      index % 2 === 0 ? "even-row" : "odd-row"
                    }`}
                  >
                    <td>{entry.serviceId}</td>
                    <td>{entry.description}</td>
                    <td className="text-align-right">{entry.fQuantity}</td>
                    <td>{entry.cargoDescription}</td>
                    <td className="text-align-right">{entry.mRate}</td>
                    <td>{entry.currency}</td>
                    <td className="text-align-right">{entry.fExchangeRate}</td>
                    <td className="text-align-right">{entry.taxPer}</td>
                    <td className="text-align-right">{entry.taxAmount}</td>
                    <td className="text-align-right">{entry.mGross}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Render Select and Goto button when no table shown
        <>
          <div className="move-cost-tab">
            <div className="filter-group">
              <label htmlFor="vendor-select">Tax Invoice</label>
              <Select
                className="customDropdown head_input"
                styles={customStyles}
                options={taxInvOptions}
                value={selectedTaxInv}
                onChange={handleSelectTaxInv}
                isClearable={true}
                placeholder="Select Invoice"
              />
            </div>
            <div>
              <button
                className="btn btn_post"
                style={{ marginTop: "20px" }}
                onClick={handleGoToInv}
              >
                Goto/Invoice
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GotoInvoice;
