import React, { useEffect, useContext, useState } from "react";
import Select from "react-select";
import "../../styles/moveCost.css";
import { JobContext } from "../../context/JobContext";
import { focusFetchDataFromApi } from "../../services/focusFetchAPI";

const customStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 13,
    width: "250px",
  }),
  //  "dropdown-content": (provided) => ({ ...provided }),

  control: (provided) => ({
    ...provided,
    borderColor: "#868e96",
    width: "250px",
    paddingLeft: "3px",
    // zIndex: 9,
    // Add custom styles for the control (container)
    // border color on focus and active state
    boxShadow: "none", // Remove default box shadow
    "&:hover": { borderColor: "#44799b" },
  }),
  // input styles
  input: (provided) => ({
    ...provided,
    // Add custom styles for the input
    // color: "red", // Change the text color to red as an example
    fontSize: "13px", // Set the font size
    fontWeight: "400", // Set the font weight
    // zIndex: 9,
    width: "150px",
    // paddingLeft: "3px",
    border: "none",
  }),

  singleValue: (provided) => ({
    ...provided,
    // Add custom styles for the selected value
    color: "black", // Change the text color to red as an example
    fontSize: "13px", // Set the font size
    fontWeight: "400", // Set the font weight
  }),
  option: (provided, state) => ({
    ...provided,
    // zIndex: 9,
    color: state.isSelected ? "black" : "black", // Text color based on selection
    backgroundColor: state.isSelected ? "#c6def5" : "#f8f9fa", // Background color based on selection
    "&:hover": {
      backgroundColor: state.isSelected ? "#dce7f2" : "#e2e6ea", // Change hover background based on selection
      color: "black", // Text color on hover
    },
  }),
};

function MoveCost() {
  const [selectedMoveJob, setSelectedMoveJob] = React.useState(null);

  const {
    sessionId,
    setIsLoading,
    selectedJob,
    costEntry,
    fetchCostEntryDetails,
  } = useContext(JobContext); // get sessionId from context
  console.log("costEntry", costEntry);
  const [jobOptions, setJobOptions] = useState([]);

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    const jobQuery = `
      SELECT sName AS label, iMasterId AS value 
      FROM mCore_joborder 
      WHERE iMasterId not in (${selectedJob?.jobId}, 0) 
      AND iStatus <> 5;
    `;
    const jobReqData = {
      data: [{ Query: jobQuery }],
    };

    try {
      const jobResponse = await focusFetchDataFromApi(
        "utility/executesqlquery",
        jobReqData,
        sessionId,
        setIsLoading
      );

      if (
        jobResponse &&
        jobResponse.result === 1 &&
        jobResponse.data?.[0]?.Table?.length > 0
      ) {
        setJobOptions(jobResponse.data[0].Table);
      } else {
        console.warn("No job data found.");
        setJobOptions([]);
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      setJobOptions([]);
    }
  };

  const handleSelectJob = (selectedOption) => {
    setSelectedMoveJob(selectedOption);
    // Handle job selection logic here
  };

  const handleMoveCost = async () => {
    if (!selectedMoveJob) {
      alert("Please select Move Cost to Job#");
      return;
    }
    const selectedEntries = costEntry?.filter((entry) => entry.selected);
    const selectedBodyIds = selectedEntries.map((entry) => entry.iBodyId);
    const selectedHeaderIds = selectedEntries.map((entry) => entry.iHeaderId);

    console.log("Selected iBodyId values:", selectedBodyIds);

    // You can now use selectedBodyIds for further processing (e.g. API call)

    const moveCostQuery = `UPDATE t
SET t.iTag3008 = ${selectedMoveJob?.value}
FROM tCore_Data_Tags_0 t
JOIN tCore_Data_0 d ON t.iBodyId = d.iBodyId
JOIN tCore_Header_0 h ON d.iHeaderId = h.iHeaderId
WHERE h.iHeaderId IN (${selectedHeaderIds?.join(",")});
;`;
    //     const moveCostQuery = `
    // UPDATE t
    // SET t.iTag3008 = ${selectedMoveJob?.value}
    // FROM tCore_Data_Tags_0 t
    // JOIN tCore_Data_0 d ON t.iBodyId = d.iBodyId
    // WHERE d.iBodyId in (${selectedBodyIds?.join(",")});`;

    const moveCostRequestData = {
      data: [
        {
          Query: `${moveCostQuery}`,
        },
      ],
    };

    const moveCostResponse = await focusFetchDataFromApi(
      "utility/ExecuteNonQuery",
      moveCostRequestData,
      sessionId,
      setIsLoading
    );

    if (moveCostResponse.error) {
      console.error("Error updating moveCost:", moveCostResponse.error);
      alert(
        `Error updating moveCost: ${
          moveCostResponse?.error?.message || moveCostResponse.error
        }`
      );
      return;
    }
    if (
      moveCostResponse &&
      moveCostResponse?.data &&
      moveCostResponse?.result === 1 &&
      moveCostResponse?.data[0].Result &&
      moveCostResponse?.data[0].Result > 0
    ) {
      const moveCostEntries = moveCostResponse?.data[0].Result;
      console.log("updating moveCost:", moveCostEntries);
      alert("Job Id Updated Successfully");
      fetchCostEntryDetails(selectedJob?.jobId);
      setSelectedMoveJob(null);
    }
  };

  return (
    <div className="move-cost-tab">
      {costEntry?.some((entry) => entry.selected) ? (
        <>
          <div className="filter-group">
            <label htmlFor="vendor-select">Move Cost to Job#</label>
            <Select
              className="customDropdown head_input "
              styles={customStyles}
              options={jobOptions}
              value={selectedMoveJob}
              onChange={handleSelectJob}
              isClearable={true}
              placeholder="Select Job"
            />
          </div>
          <div>
            <button
              className="btn btn_post"
              style={{ marginTop: "20px" }}
              onClick={handleMoveCost}
            >
              Move Cost
            </button>
          </div>
        </>
      ) : (
        <div style={{ marginTop: "20px", color: "black", fontWeight: "bold" }}>
          Please select at least one Cost Entry for Move Cost
        </div>
      )}
    </div>
  );
}

export default MoveCost;
