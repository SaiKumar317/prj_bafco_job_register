import React, { Component } from "react";
import HeaderTabs from "../components/jobDetails/HeaderTabs";
import BodyTabs from "../components/jobDetails/BodyTabs";
import "../styles/jobDetails.css";

class JobDetails extends Component {
  state = {
    activeHeaderTab: "Notes",
    activeBodyTab: "Cost Entry",
  };

  setHeaderTab = (tab) => {
    this.setState({ activeHeaderTab: tab });
  };

  setBodyTab = (tab) => {
    this.setState({ activeBodyTab: tab });
  };

  render() {
    const { activeHeaderTab, activeBodyTab } = this.state;

    return (
      <div className="jobdetails-container">
        {/* Header Form Section */}
        <div className="job-header">
          <div>
            <div className="job-fields">
              <div>
                <label>Job Id</label>
                <input type="text" value="13326/25-07" readOnly />
              </div>
              <div>
                <label>Cost Date</label>
                <input type="date" defaultValue="2025-07-30" />
              </div>
              <div>
                <label>Total Sales</label>
                <input type="text" value="11,437.00" readOnly />
              </div>
              <div>
                <label>Total Cost</label>
                <input type="text" value="8,320.00" readOnly />
              </div>
              <div>
                <label>Profit/(loss) - NoTax</label>
                <span className="profit-box">3,117.00</span>
              </div>
            </div>
            <div className="job-buttons-below">
              <button className="btn btn-green">Preview Cost Sheet</button>
            </div>
            <div className="job-checkboxes">
              <label>
                <input type="checkbox" /> Cost Locked?
              </label>
              {/* <label>
                <input type="checkbox" /> Cost Posted?
              </label>
              <label>
                <input type="checkbox" /> Invoice Posted?
              </label> */}
            </div>
          </div>
          {/* <div className="job-buttons">
            <button className="btn btn-blue">Save Notes/Lock</button>
            <button className="btn btn-green">Preview Cost Sheet</button>
          </div> */}

          {/* Header Tabs */}
          <HeaderTabs
            activeHeaderTab={activeHeaderTab}
            setHeaderTab={this.setHeaderTab}
          />
        </div>

        {/* Body Tabs */}
        <BodyTabs activeBodyTab={activeBodyTab} setBodyTab={this.setBodyTab} />
      </div>
    );
  }
}

export default JobDetails;
