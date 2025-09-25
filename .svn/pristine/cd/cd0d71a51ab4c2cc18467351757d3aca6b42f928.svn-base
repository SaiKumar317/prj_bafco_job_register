import React from "react";
// import "./jobDetails.css";

function HeaderTabs({ activeHeaderTab, setHeaderTab }) {
  const renderContent = () => {
    switch (activeHeaderTab) {
      case "Job/Inv":
        return (
          <div className="tab-content">
            <div className="notes-box">
              <p>
                <strong>Job Id:</strong> 13326/25-07, Date: 10/07/2025 <br />
                <strong>Operation:</strong> EXP, Branch: H.O, Status: C <br />
                <strong>Customer:</strong> MSGI - MAHMOOD SAEED GLASS INDUSTRIES{" "}
                <br />
                <strong>POL:</strong> JEDDAH, <strong>POD:</strong> SANTOS{" "}
                <br />
                <strong>Handled by:</strong> NAWAZ PASHA,{" "}
                <strong>Salesman:</strong> RAZACK <br />
                <strong>Total 20' :</strong> 10
              </p>
            </div>
          </div>
        );

      case "Notes":
        return (
          <div className="tab-content">
            <h4>Notes</h4>
            <textarea
              style={{ width: "100%", height: "100px" }}
              placeholder="Enter notes here..."
            />
            <button className="btn btn-primary">Save Notes</button>
          </div>
        );

      case "Move Cost":
        return (
          <div className="tab-content">
            <h4>Move Cost</h4>
            <p>Here you can transfer costs from one job to another.</p>
            <button className="btn btn-warning">Move Cost</button>
          </div>
        );

      case "Goto/Invoice":
        return (
          <div className="tab-content">
            <h4>Goto Invoice</h4>
            <p>Navigate directly to the related invoices.</p>
            <button className="btn btn-info">View Invoice</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="header-tabs">
        {["Job/Inv", "Notes", "Move Cost", "Goto/Invoice"].map((tab) => (
          <button
            key={tab}
            className={`header-tab ${activeHeaderTab === tab ? "active" : ""}`}
            onClick={() => setHeaderTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="header-tab-content">{renderContent()}</div>
    </div>
  );
}

export default HeaderTabs;
