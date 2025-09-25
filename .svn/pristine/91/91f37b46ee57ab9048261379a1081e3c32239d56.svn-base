/**
 * Parses CSV text into JSON
 * @param {string} csv - Raw CSV string
 * @returns {Array} Parsed JSON array
 */
export const parseCSV = (csv) => {
  const [headerLine, ...lines] = csv.trim().split("\n");
  // Convert headers to lowercase here
  const headers = headerLine.split(",").map((h) => h.trim().toLowerCase());

  const data = lines.map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] ?? "";
    });
    return obj;
  });

  return {
    columns: headers,
    data,
    totalRows: data.length,
  };
};
