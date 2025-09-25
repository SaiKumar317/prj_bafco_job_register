import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const generateJobOrderChargesExcel = async (jobOrderData = []) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Job Order Charges");

  // 🔹 Title
  worksheet.mergeCells("A1:W1"); // 23 columns = A to W
  const titleCell = worksheet.getCell("A1");
  titleCell.value = "Job Order Charges Report";
  titleCell.font = { size: 16, bold: true };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  worksheet.addRow([]); // Empty row

  // 🔹 Headers (Match the <th> exactly)
  const headers = [
    "chargeId",
    "chargeTypeId",
    "amount",
    "chargeDescription",
    "quantity",
    "unitPrice",
    "priceExclVat",
    "vat",
    "vatAmount",
    "totalIncludingVAT",
    "inActive",
    "updatedByUserId",
    "dateUpdated",
    "currencyId",
    "currency_code",
    "updateByUserId",
    "updateByUser",
    "buyingRate",
    "codeName",
    "newChargeTypeId",
    "newChargeTypeCode",
    "Item",
    "Tax Code",
  ];
  worksheet.addRow(headers);

  // 🔹 Header Styling
  const headerRow = worksheet.getRow(3);
  headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
  for (let i = 1; i <= headers.length; i++) {
    const cell = headerRow.getCell(i);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "44799B" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  }
  // headerRow.fill = {
  //   type: "pattern",
  //   pattern: "solid",
  //   fgColor: { argb: "44799B" },
  // };
  // headerRow.alignment = { horizontal: "center", vertical: "middle" };

  // 🔹 Freeze Header Row
  worksheet.views = [
    {
      state: "frozen",
      ySplit: 3,
    },
  ];

  // 🔹 Add Data Rows
  jobOrderData.forEach((entry) => {
    worksheet.addRow([
      entry.chargeId,
      entry.chargeTypeId,
      entry.amount,
      entry.chargeDescription,
      entry.quantity,
      entry.unitPrice,
      entry.priceExclVat,
      entry.vat,
      entry.vatAmount,
      entry.totalIncludingVAT,
      entry.inActive,
      entry.updatedByUserId,
      entry.dateUpdated,
      entry.currencyId,
      entry.currency_code,
      entry.updateByUserId,
      entry.updateByUser,
      entry.buyingRate,
      entry.codeName,
      entry.newChargeTypeId,
      entry.newChargeTypeCode,
      entry.Item,
      entry.taxCode,
    ]);
  });

  // 🔹 Format Rows: Borders + Alignment
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

  // 🔹 Auto Width for Columns
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 20 ? 20 : maxLength + 2;
  });

  // 🔹 Export File
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "Job-Order-Charges-Report.xlsx");
};
