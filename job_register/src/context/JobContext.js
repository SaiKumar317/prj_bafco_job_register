import React, { Component, createContext } from "react";

export const JobContext = createContext();

export class JobProvider extends Component {
  state = {
    jobs: [
      {
        id: "15220/25-08",
        date: "04/08/2025",
        shipLine: "EMIRATES",
        status: "In Progress",
      },
      {
        id: "15221/25-08",
        date: "05/08/2025",
        shipLine: "TURKISH",
        status: "Completed",
      },
    ],
    selectedJob: null,
  };

  setSelectedJob = (job) => {
    this.setState({ selectedJob: job });
  };

  render() {
    return (
      <JobContext.Provider
        value={{
          ...this.state,
          setSelectedJob: this.setSelectedJob,
        }}
      >
        {this.props.children}
      </JobContext.Provider>
    );
  }
}
