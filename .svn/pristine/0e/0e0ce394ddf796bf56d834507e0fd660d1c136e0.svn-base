import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const generateCostEntryPdf = (
  costEntry = [],
  selectedJob = {},
  costDate = ""
) => {
  const doc = new jsPDF();

  const formatDate = (date) => (date ? moment(date).format("DD/MM/YYYY") : "");

  // --- Title ---
  const title = `Cost Entry Report`;
  doc.setFontSize(14);
  doc.text(title, 105, 10, { align: "center" });

  // --- ⏱️ Date/Time Stamp ---
  const timestamp = `Generated on: ${moment().format("DD/MM/YYYY HH:mm")}`;
  doc.setFontSize(8);
  doc.text(timestamp, 200, 10, { align: "right" }); // Top-right corner

  doc.setFontSize(10);

  // --- Job Info ---
  const jobDetails = [
    ["Job Id", selectedJob.jobName ?? ""],
    ["Cost Date", formatDate(costDate)],
    ["Total Sales", selectedJob.totalSales ?? ""],
    ["Total Cost", selectedJob.totalCost ?? ""],
    ["Profit/(Loss) - NoTax", selectedJob?.profitLossNoTax ?? ""],
    ["Cost Locked", selectedJob.costLocked ? "Yes" : "No"],
  ];

  let y = 20;
  jobDetails.forEach((_, index) => {
    if (index % 2 === 0) {
      const [label1, value1] = jobDetails[index];
      const [label2, value2] = jobDetails[index + 1] || ["", ""];

      doc.setTextColor(0, 0, 0);
      doc.text(`${label1}:`, 14, y);

      if (label1 === "Profit/(Loss) - NoTax") {
        const cleanVal = (value1 || "").toString().replace(/[^\d.-]/g, "");
        const numericVal = parseFloat(cleanVal);
        if (!isNaN(numericVal)) {
          doc.setTextColor(
            numericVal < 0 ? 255 : 0,
            numericVal < 0 ? 0 : 128,
            0
          );
        }
      }

      doc.text(String(value1), 50, y);
      doc.setTextColor(0, 0, 0);
      doc.text(`${label2}:`, 110, y);
      doc.text(String(value2), 150, y);

      y += 6;
    }
  });

  const columns = [
    { header: "Vendor Id", dataKey: "vendorAcc" },
    { header: "INV #", dataKey: "vendorInvNo" },
    { header: "INV Date", dataKey: "vendorInvDate" },
    { header: "Credit", dataKey: "purchaseAcc" },
    { header: "0 Tax Cost", dataKey: "zeroTaxCost" },
    { header: "Tax Cost", dataKey: "taxCost" },
    { header: "Tax Amount", dataKey: "taxAmount" },
    { header: "Total Cost", dataKey: "totalCost" },
    { header: "EIR Id", dataKey: "eirId" },
    { header: "Challan", dataKey: "challan" },
    { header: "Cntr #", dataKey: "containerNo" },
    { header: "Narration", dataKey: "sRemarks" },
  ];

  const rows = costEntry.map((entry) => ({
    vendorAcc: entry.vendorAcc || "",
    vendorInvNo: entry.vendorInvNo || "",
    vendorInvDate: formatDate(entry.vendorInvDate),
    purchaseAcc: entry.purchaseAcc || "",
    zeroTaxCost: entry.zeroTaxCost ?? "",
    taxCost: entry.taxCost ?? "",
    taxAmount: entry.taxAmount ?? "",
    totalCost: entry.totalCost ?? "",
    eirId: entry.eirId || "",
    challan: entry.challan || "",
    containerNo: entry.containerNo || "",
    sRemarks: entry.sRemarks || "",
  }));

  doc.autoTable({
    startY: y + 4,
    head: [columns.map((col) => col.header)],
    body: rows.map((row) => columns.map((col) => row[col.dataKey])),
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: "linebreak",
      valign: "middle",
      textColor: [0, 0, 0],
      lineColor: [204, 204, 204],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [68, 121, 155],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      lineColor: [204, 204, 204],
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      4: { halign: "right" },
      5: { halign: "right" },
      6: { halign: "right" },
      7: { halign: "right" },
    },
    margin: { left: 14, right: 14 },
    theme: "grid",
  });

  // --- Page Numbers (after table is rendered)
  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  doc.save("Cost-Entry-Report.pdf");
};
