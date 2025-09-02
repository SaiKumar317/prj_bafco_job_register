import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const generateExcel = async (gridData) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Purchase Planning Report");

  // Title
  worksheet.mergeCells("A1:Z2");
  const titleRow = worksheet.getCell("A1");
  titleRow.value = "Purchase Planning Report";
  titleRow.font = { bold: true, size: 16 };
  titleRow.alignment = { vertical: "middle", horizontal: "left" };
  titleRow.height = 30;

  // Leave one row empty
  worksheet.addRow([]);

  // Define headers (titles)
  const headers = [
    "Item Code",
    "Item Name",
    "Total Requirment (Projects)",
    "Total Requirment (Spare Sale Orders)",
    "PO Planning Qty",
    "Reorder Qty",
    "Total Requirment (Projects + Sale Orders + PO Planning Qty + Reorder Qty)",
    "Main Location Stock",
    "Spares Location Stock (information only)",
    "BOQ PR",
    "BOQ PO",
    "Gen PR",
    "Gen PO",
    "Total Available Stock",
    "Total Consumed (Projects)",
    "Total Consumed (Spares Sale Orders)",
    "Issue To Production",
    "Total Consumed (Projects + Sale Orders + Issue to Prod)",
    "Quantity to Order",
    "Model",
    "Make",
    "Size",
    "Pref Supp-1",
    "Pref Supp-2",
    "Pref Supp-3",
    "Lead Time (Days)",
  ];

  const headerRowIndex = 4;
  worksheet.addRow(headers);
  const headerRow = worksheet.getRow(headerRowIndex);
  headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "0073AA" },
  };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };

  // Freeze header
  worksheet.views = [
    {
      state: "frozen",
      ySplit: headerRowIndex,
    },
  ];

  // Fill in data rows
  gridData.forEach((item) => {
    worksheet.addRow([
      item.itemCode,
      item.itemName,
      item.totalQtyReqProject,
      item.totalQtyReqSSalesOrder,
      item.totalPOPlanningQty,
      item.fReorderLevel,
      item.totalReqSOPO,
      item.ppWhnetQty,
      item.spareWnetQty,
      item.totalBoqPRBalance,
      item.totalBoqPOBalance,
      item.totalGenPRBalance,
      item.totalGenPOBalance,
      item.totalAvailableStock,
      item.totalQtyConsumProject,
      item.totalQtyConsumSDC,
      item.totalIssueQty,
      item.totalQtyConsumSOPO,
      item.Quantity ?? 0,
      item.ItemModelNo,
      item.Make,
      item.Size,
      item.iSupplier0,
      item.iSupplier1,
      item.iSupplier2,
      item.LeadTime,
    ]);
  });

  // Format rows
  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex >= headerRowIndex) {
      row.alignment = { horizontal: "center", vertical: "middle" };
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }
  });

  // Set column widths
  worksheet.columns.forEach((column) => {
    column.width = 20;
  });

  // Export the file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "Purchase-Planning-Report.xlsx");
};
