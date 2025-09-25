import React from "react";
import { parseCSV } from "../../utils/csvParser"; // Your CSV parser utility
import { focusFetchDataFromApi } from "../../services/focusFetchAPI";
import { JobContext } from "../../context/JobContext";

class JobCostUploader extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      parsedData: null, // Store parsed CSV data here
    };
  }
  static contextType = JobContext;
  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file only.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsed = parseCSV(text);
        console.log("✅ CSV parsed:", parsed);

        const requiredHeaders = [
          "job_number",
          "vendor_inv_no",
          "vendor_inv_date",
          "zero_tax_cost",
          "tax_cost",
          "vendor_id",
        ];
        // Check if all required headers exist in parsed.columns
        const missingHeaders = requiredHeaders.filter(
          (header) => !parsed.columns.includes(header?.toLowerCase())
        );

        if (missingHeaders.length > 0) {
          alert(
            `Please check your CSV file.\nMissing required headers: ${missingHeaders.join(
              ", "
            )}.`
          );
          return; // stop here, don't set state
        }

        // Save parsed data in state
        this.setState({
          parsedData: {
            fileName: file.name,
            ...parsed,
          },
        });
      } catch (err) {
        console.error("❌ Error parsing CSV:", err);
        alert("Failed to parse CSV. Please check the file format.");
      }
    };

    reader.readAsText(file);
  };

  // downloading error logs
  downloadTxtFile(data, errorFile) {
    var text = data.join("\n");
    console.log(`${errorFile}`, data);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${errorFile}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  dateToInt = (date) => {
    var postingIntDate =
      new Date([date]).getDate() +
      (new Date([date]).getMonth() + 1) * 256 +
      new Date([date]).getFullYear() * 65536;
    return postingIntDate;
  };

  handlePostJob = async () => {
    const { parsedData } = this.state;
    const { sessionId, setIsLoading, selectedJob } = this.context;

    if (!parsedData) {
      alert("Please upload a CSV file first.");
      return;
    }

    console.log("🚀 Ready to post:", parsedData);

    const arrayOfJobNo = parsedData.data.map((obj) => obj["job_number"]);
    const uniqueJobNo = [...new Set(arrayOfJobNo)].filter(Boolean);

    const arrayOfVendorId = parsedData.data.map((obj) => obj["vendor_id"]);
    const uniqueVendorId = [...new Set(arrayOfVendorId)].filter(Boolean);

    const missingJobNumbers = [];
    const missingVendorIds = [];

    // ✅ Query for job numbers
    const JobNoQuery = `SELECT iMasterId jobID, sName jobName, sCode jobCode
FROM mCore_joborder 
WHERE iMasterId <> 0 AND iStatus <> 5 
AND sCode IN (${uniqueJobNo.map((j) => `'${j}'`).join(",")})`;

    const jobNoReq = {
      data: [{ Query: JobNoQuery }],
    };

    const jobNoResponse = await focusFetchDataFromApi(
      "utility/executesqlquery",
      jobNoReq,
      sessionId,
      setIsLoading
    );
    if (jobNoResponse.error) {
      console.error("Error fetching Job Order:", jobNoResponse.error);
      alert(
        `Error fetching Job Order: ${
          jobNoResponse?.error?.message || jobNoResponse.error
        }`
      );
      return;
    }

    if (
      jobNoResponse &&
      jobNoResponse.result === 1 &&
      Array.isArray(jobNoResponse.data)
    ) {
      const jobTable = Array.isArray(jobNoResponse.data[0]?.Table)
        ? jobNoResponse.data[0].Table
        : [];

      const existingJobCodes = jobTable.map((j) =>
        (j?.jobCode || "").trim().toLowerCase()
      );

      missingJobNumbers.push(
        ...uniqueJobNo.filter(
          (jobNo) =>
            !existingJobCodes.includes((jobNo || "").trim().toLowerCase())
        )
      );
    }

    // ✅ Query for vendor IDs
    const VendorIdQuery = `SELECT iMasterId accId, sName accName, sCode accCode
FROM mCore_Account 
WHERE iMasterId <> 0 AND iStatus <> 5 
AND sCode IN (${uniqueVendorId.map((v) => `'${v}'`).join(",")})`;

    const vendorReq = {
      data: [{ Query: VendorIdQuery }],
    };

    const vendorResponse = await focusFetchDataFromApi(
      "utility/executesqlquery",
      vendorReq,
      sessionId,
      setIsLoading
    );

    if (vendorResponse.error) {
      console.error("Error fetching VendorId:", vendorResponse.error);
      alert(
        `Error fetching VendorId: ${
          vendorResponse?.error?.message || vendorResponse.error
        }`
      );
      return;
    }

    if (
      vendorResponse &&
      vendorResponse.result === 1 &&
      Array.isArray(vendorResponse.data)
    ) {
      const vendorTable = Array.isArray(vendorResponse.data[0]?.Table)
        ? vendorResponse.data[0].Table
        : [];

      const existingVendorCodes = vendorTable.map((v) =>
        (v?.accCode || "").trim().toLowerCase()
      );

      missingVendorIds.push(
        ...uniqueVendorId.filter(
          (vendorId) =>
            !existingVendorCodes.includes((vendorId || "").trim().toLowerCase())
        )
      );
    }

    // ✅ Log missing entries (if any)
    if (missingJobNumbers.length > 0 || missingVendorIds.length > 0) {
      const logLines = [];

      if (missingJobNumbers.length > 0) {
        logLines.push("Missing Job Numbers:");
        logLines.push(...missingJobNumbers);
        logLines.push("");
      }

      if (missingVendorIds.length > 0) {
        logLines.push("Missing Vendor IDs:");
        logLines.push(...missingVendorIds);
      }

      this.downloadTxtFile(logLines, "Missing_Jobs_And_Vendors.txt");
      alert(
        "Some job numbers or vendor IDs are missing. Please check Log file."
      );
      return;
    } else {
      console.log("all masters available");
      // post here
      // Group data by vendor_inv_no
      const groupedData = parsedData.data.reduce((acc, entry) => {
        const vendorInvNo = entry.vendor_inv_no || "UNKNOWN";

        if (!acc[vendorInvNo]) {
          acc[vendorInvNo] = [];
        }

        acc[vendorInvNo].push(entry);

        return acc;
      }, {});
      console.log("groupedData", groupedData);

      const vendorInvNos = Object.values(groupedData).map(
        (entry) => entry[0].vendor_inv_no
      );

      const inVoiceNoQuery = `SELECT 
   distinct h.sVoucherNo,
    convert (nvarchar, dbo.IntToDate(h.iDate),103) AS docDate,
    ISNULL(eb.VendorInvNo, '') AS vendorInvNo,
	h.iHeaderId
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 ind on ind.iBodyId = d.iBodyId
LEFT JOIN tCore_Data776_0 eb ON eb.iBodyId = d.iBodyId
WHERE h.iVoucherType IN (776)--Air Cargo Job 
and d.iMainBodyId = 0 and ISNULL(eb.VendorInvNo, '') in (${vendorInvNos
        .map((v) => `'${v}'`)
        .join(",")})`;

      const inVoiceNoRequest = {
        data: [
          {
            Query: inVoiceNoQuery,
          },
        ],
      };

      const invoiceNoResponse = await focusFetchDataFromApi(
        "utility/executesqlquery",
        inVoiceNoRequest,
        sessionId,
        setIsLoading
      );

      if (invoiceNoResponse.error) {
        console.error(
          "Error fetching invoiceNoResponse:",
          invoiceNoResponse.error
        );
        alert(
          `Error fetching invoiceNoResponse: ${
            invoiceNoResponse?.error?.message || invoiceNoResponse.error
          }`
        );
        return;
      }

      if (
        invoiceNoResponse &&
        invoiceNoResponse.result === 1 &&
        Array.isArray(invoiceNoResponse.data)
      ) {
        const invoiceNoTable = Array.isArray(invoiceNoResponse.data[0]?.Table)
          ? invoiceNoResponse.data[0].Table
          : [];

        const existingInvoiceNo =
          invoiceNoTable.map((v) =>
            (v?.sVoucherNo || "").trim().toLowerCase()
          ) || [];
        var focusUrl = window.focusUrl;
        var deleteInvoiceNumbers = [];
        var errorDeleteInvoices = [];
        setIsLoading(true);

        for (const postedInvoice of existingInvoiceNo) {
          const sVoucherNo = postedInvoice;
          console.log("sVoucherNo", sVoucherNo);

          const deleteInvoice = await fetch(
            `${focusUrl}/Transactions/776/${sVoucherNo}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                fSessionId: sessionId,
              },
            }
          );
          const deleteInvoiceData = await deleteInvoice.json();
          console.log("deleteInvoice", deleteInvoiceData);
          if (deleteInvoiceData?.result === 1) {
            deleteInvoiceNumbers.push(deleteInvoiceData?.VoucherNo);
          } else {
            errorDeleteInvoices.push(
              `${sVoucherNo}: ${deleteInvoiceData?.message}`
            );
          }
        }
        setIsLoading(false);

        if (errorDeleteInvoices?.length > 0) {
          errorDeleteInvoices.unshift(
            "Error in deleting Job Costing Allocation:\n"
          );
          this.downloadTxtFile(
            errorDeleteInvoices,
            "Error_deleting_invoices.txt"
          );
          alert(`Error deleting invoices, Please check log file`);
          return;
        }
      }

      var postedInvoices = [];
      var notPostedInvoices = [];

      for (let invoiceNo in groupedData) {
        const invoiceData = groupedData[invoiceNo];
        // Process each invoice's data
        const bodyData = [];

        for (let i = 0; i < invoiceData.length; i++) {
          const importedRow = invoiceData[i];
          const zeroTaxCost = importedRow?.zero_tax_cost;
          const taxCost = importedRow?.tax_cost;

          // Taxable entry
          if (parseFloat(taxCost) > 0) {
            bodyData.push({
              Job__Id: importedRow?.job_number,
              Division__Code: "Head Office",
              Item__Code: "JCA",
              TaxCode__Code: "SR-REC",
              Quantity: 1.0,
              Rate: parseFloat(taxCost || 0),
              Gross: parseFloat(taxCost || 0),
              VendorInvNo: invoiceNo || "",
              VendorInvDate: this.dateToInt(importedRow?.vendor_inv_date) || 0,
            });
          }

          // Zero-rated entry
          if (parseFloat(zeroTaxCost) > 0) {
            bodyData.push({
              Job__Id: importedRow?.job_number,
              Division__Code: "Head Office",
              Item__Code: "JCA",
              TaxCode__Code: "SR-REC",
              Quantity: 1.0,
              Rate: parseFloat(zeroTaxCost || 0),
              Gross: parseFloat(zeroTaxCost || 0),
              VendorInvNo: invoiceNo || "",
              VendorInvDate: this.dateToInt(importedRow?.vendor_inv_date) || 0,
            });
          }
        }
        const headerData = {
          Date: this.dateToInt(invoiceData?.[0]?.vendor_inv_date),
          PurchaseAC__Code: "511003",
          VendorAC__Code: invoiceData?.[0]?.vendor_id || "",
          "Place of supply__Code": "JDH",
          Jurisdiction__Code: "KSA",
          Branch__Code: "HEAD OFFICE",
          sNarration: "",
        };

        const jobCostRequest = JSON.stringify({
          data: [
            {
              Body: bodyData,
              Header: headerData,
            },
          ],
        });

        const costResponse = await focusFetchDataFromApi(
          "Transactions/776/",
          jobCostRequest,
          sessionId,
          setIsLoading
        );

        if (costResponse.error) {
          console.error(
            "Error posting job cost allocation:",
            costResponse.error
          );
          notPostedInvoices.push(
            `vendor_inv_no: ${invoiceNo || ""}, Error Message: ${
              costResponse?.error?.message || costResponse.error
            }`
          );
        }
        if (costResponse && costResponse?.result === 1) {
          postedInvoices.push(costResponse?.data[0].VoucherNo);
        }
      }

      if (notPostedInvoices.length > 0) {
        // check partial success
        if (postedInvoices.length > 0) {
          alert(`Some Job Costing Allocation were posted successfully`);
          notPostedInvoices.pop(
            "The following Job Costing Allocation could not be posted:\n"
          );
          this.downloadTxtFile(
            notPostedInvoices,
            "Job_Costing_Allocation_error.txt"
          );
        } else {
          alert("Posting Failed");
          notPostedInvoices.unshift(
            "The following Job Costing Allocation could not be posted:\n"
          );
          this.downloadTxtFile(
            notPostedInvoices,
            "Job_Costing_Allocation_error.txt"
          );
        }
      } else {
        alert(`Posted Successfully`);
        this.fileInputRef.current.value = ""; // Clear the file input
        this.setState({ parsedData: null }); // Optional: clear parsed data
      }
    }
  };

  render() {
    return (
      <div className="filters-bar">
        <div className="filter-group" style={{ paddingTop: "10px" }}>
          <label htmlFor="cost-import">Job Cost Import (CSV)</label>
          <input
            type="file"
            id="cost-import"
            accept=".csv"
            className="input-field job-cost-import"
            ref={this.fileInputRef}
            onChange={this.handleFileChange}
          />
        </div>
        <div style={{ paddingBottom: "6px" }}>
          <button className="btn btn_post" onClick={this.handlePostJob}>
            Post
          </button>
        </div>
      </div>
    );
  }
}

export default JobCostUploader;
