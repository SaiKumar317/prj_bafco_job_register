import React from "react";

function JobDetailsTransport({ data }) {
  if (!data || data.length === 0) {
    return (
      <p style={{ fontWeight: "bold" }}>
        No Job details data found for the selected job.
      </p>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="job-table" style={{ width: "100%", minWidth: "600px" }}>
        <thead>
          <tr>
            <th>Container Type</th>
            <th>Container No</th>
            <th>Seal No</th>
            <th>Bafco Age</th>
            <th>Shipline Age</th>
            <th>Shuttled Out</th>
            <th>Case In</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{item.containerType || "-"}</td>
              <td>{item.containerNo || "-"}</td>
              <td>{item.sealNo || "-"}</td>
              <td className="text-align-right">
                {item.bAge != null ? item.bAge : "-"}
              </td>
              <td className="text-align-right">
                {item.sAge != null ? item.sAge : "-"}
              </td>
              <td>{item.dateShuttle || "-"}</td>
              <td>{item.dateAgeIn || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobDetailsTransport;
