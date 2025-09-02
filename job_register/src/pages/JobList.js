import React, { Component } from "react";
import { JobContext } from "../context/JobContext";
import { withRouter } from "react-router-dom";
import "../styles/jobList.css";

class JobList extends Component {
  static contextType = JobContext;

  handleJobClick = (job) => {
    this.context.setSelectedJob(job);
    this.props.history.push(`/job/${job.id}`);
  };

  render() {
    const { jobs } = this.context;

    return (
      <div className="joblist-container">
        {/* 🔹 Filters Section */}
        <div className="filters-bar">
          <label>
            <input type="checkbox" /> My Jobs
          </label>
          <input type="date" defaultValue="2025-07-04" />
          <input type="date" defaultValue="2025-08-05" />
          <label>
            <input type="checkbox" /> Ignore Date?
          </label>
          <button className="btn btn-blue">Refresh</button>
          <button className="btn btn-light">Clear Filter</button>

          <div className="radio-group">
            <label>
              <input type="radio" name="type" /> Cntr
            </label>
            <label>
              <input type="radio" name="type" /> BL
            </label>
            <label>
              <input type="radio" name="type" /> CL
            </label>
            <label>
              <input type="radio" name="type" /> Bayan
            </label>
          </div>

          <input type="text" placeholder="Search..." className="search-box" />
          <button className="btn btn-green">Find</button>
          <button className="btn btn-green">Add New Job</button>
        </div>

        {/* 🔹 Table Section */}
        <table className="job-table">
          <thead>
            <tr>
              <th>Job Id</th>
              <th>Date</th>
              <th>Ship/Consg</th>
              <th>PO Ref</th>
              <th>Ship Line</th>
              <th>Status</th>
              <th>Vessel</th>
              <th>ETA Date</th>
              <th>POL</th>
              <th>POD</th>
              <th>MBL</th>
              <th>HBL</th>
              <th>Handle By</th>
              <th>FR-TERM</th>
              <th>Invoice#</th>
              <th>Branch</th>
              <th>Salesman</th>
              <th>Operation</th>
            </tr>
            {/* 🔹 Filter Row under headers */}
            <tr className="filter-row">
              {Array(18)
                .fill(0)
                .map((_, i) => (
                  <th key={i}>
                    <input type="text" className="filter-input" />
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <span
                    className="job-link"
                    onClick={() => this.handleJobClick(job)}
                  >
                    {job.id}
                  </span>
                </td>
                <td>{job.date}</td>
                <td>{job.shipConsg || "NA"}</td>
                <td>{job.poRef || ""}</td>
                <td>{job.shipLine}</td>
                <td>{job.status}</td>
                <td>{job.vessel || ""}</td>
                <td>{job.etaDate || ""}</td>
                <td>{job.pol || ""}</td>
                <td>{job.pod || ""}</td>
                <td>{job.mbl || ""}</td>
                <td>{job.hbl || ""}</td>
                <td>{job.handleBy || ""}</td>
                <td>{job.frTerm || ""}</td>
                <td>{job.invoice || ""}</td>
                <td>{job.branch || ""}</td>
                <td>{job.salesman || ""}</td>
                <td>{job.operation || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(JobList);
