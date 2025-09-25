import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const generateJobDetailsExcel = async (jobOrderData = []) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Job Details"); // updated sheet name

  // === BASIC INFO SECTION ===
  const basicInfoHeaders = [
    "Status",
    "Operation",
    "Service Type",
    "Job Id",
    "Date",
    "SO #",
    "Branch",
    "Customer",
    "Handle By",
    "Salesman",
    "Division",
    "Cost Center",
    "Customer PO Ref",
    "Ship(E)/Ship(I)",
    "Freight Term",
    "Ship Line",
    "Vessel",
    "Voyage",
    "POL",
    "POD",
    "ETA Date",
    "Shipped on Board",
    "Final Destination",
    "Booked Container",
    "Goods Type",
    "DG Class",
    "Commodity Type",
    "Cargo Pickup Place",
    "Drop of Place",
    "MBL",
    "HBL",
    "Weight (kgs)",
    "Measurement (CBM)",
    "AWB",
    "Bayan",
    "Customs Broker",
    "Booking Type",
    "Overseas Agent",
    "Network Type",
    "Notes",
  ];

  worksheet.mergeCells("A1:AL1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = "Job Details Report"; // updated title
  titleCell.font = { size: 16, bold: true };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };

  worksheet.addRow([]);
  worksheet.addRow(basicInfoHeaders);

  const basicInfoHeaderRow = worksheet.getRow(3);
  basicInfoHeaderRow.font = { bold: true, color: { argb: "FFFFFF" } };
  for (let i = 1; i <= basicInfoHeaders.length; i++) {
    const cell = basicInfoHeaderRow.getCell(i);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "44799B" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  }
  //   basicInfoHeaderRow.fill = {
  //     type: "pattern",
  //     pattern: "solid",
  //     fgColor: { argb: "44799B" },
  //   };
  //   basicInfoHeaderRow.alignment = { horizontal: "center", vertical: "middle" };

  const firstEntry = jobOrderData[0] || {};

  const basicInfoData = [
    firstEntry.jobStatus || "",
    firstEntry.operationType || "",
    firstEntry.serviceType || "",
    firstEntry.jobId || "",
    firstEntry.docDate || "",
    firstEntry.serviceOrderId || "",
    firstEntry.branch || "",
    firstEntry.customerAcc || "",
    firstEntry.handleBy || "",
    firstEntry.salesman || "",
    firstEntry.division || "",
    firstEntry.costCenter || "",
    firstEntry.PORef || "",
    "",
    firstEntry.freightTerms || "",
    firstEntry.shippingLine || "",
    firstEntry.vessel || "",
    firstEntry.voyage || "",
    firstEntry.portLoading || "",
    firstEntry.portDestination || "",
    "",
    "",
    firstEntry.finalDestination || "",
    firstEntry.bookedContainer || "",
    firstEntry.goodsType || "",
    firstEntry.dgClass || "",
    firstEntry.jobCommodity || "",
    firstEntry.pickupPlace || "",
    firstEntry.dropofPlace || "",
    firstEntry.MblNoHeader || "",
    firstEntry.HblNoHeader || "",
    firstEntry.weightKgs || "",
    firstEntry.measurementCbm || "",
    firstEntry.cargoAwb || "",
    firstEntry.bayanNo || "",
    "",
    firstEntry.bookinType || "",
    firstEntry.overseasAgent || "",
    firstEntry.networkType || "",
    firstEntry.notes || firstEntry.notes1 || "",
  ];

  worksheet.addRow(basicInfoData);

  worksheet.addRow([]);
  worksheet.addRow([]);

  const transportHeaders = [
    "Container Type",
    "Container No",
    "Seal No",
    "Bafco Age",
    "Shipline Age",
    "Shuttled Out",
    "Case In",
  ];

  const transportTitleRowNumber = worksheet.lastRow.number + 1;
  worksheet.mergeCells(
    `A${transportTitleRowNumber}:G${transportTitleRowNumber}`
  );
  const transportTitleCell = worksheet.getCell(`A${transportTitleRowNumber}`);
  transportTitleCell.value = "Transportation Details";
  transportTitleCell.font = { size: 16, bold: true };
  transportTitleCell.alignment = { vertical: "middle", horizontal: "center" };

  worksheet.addRow([]);
  worksheet.addRow(transportHeaders);

  const transportHeaderRowNumber = worksheet.lastRow.number;
  const transportHeaderRow = worksheet.getRow(transportHeaderRowNumber);
  transportHeaderRow.font = { bold: true, color: { argb: "FFFFFF" } };
  for (let i = 1; i <= transportHeaders.length; i++) {
    const cell = transportHeaderRow.getCell(i);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "44799B" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  }
  //   transportHeaderRow.fill = {
  //     type: "pattern",
  //     pattern: "solid",
  //     fgColor: { argb: "44799B" },
  //   };
  //   transportHeaderRow.alignment = { horizontal: "center", vertical: "middle" };

  jobOrderData.forEach((entry) => {
    worksheet.addRow([
      entry.containerType || "",
      entry.containerNo || "",
      entry.sealNo || "",
      entry.bAge || "",
      entry.sAge || "",
      entry.dateShuttle || "",
      entry.iHeaderId || "",
    ]);
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber >= 3) {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });
    }
  });

  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const length = cell.value ? cell.value.toString().length : 0;
      if (length > maxLength) maxLength = length;
    });
    column.width = maxLength < 20 ? 20 : maxLength + 2;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "Job-Details-Report.xlsx"); // updated file name
};
