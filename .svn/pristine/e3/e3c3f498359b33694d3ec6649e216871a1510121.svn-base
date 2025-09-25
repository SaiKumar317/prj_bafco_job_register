import React, { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import getSessionId from "../sessionId";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";
import { Focus8WAPI, sessionId, companyCode, AccountDate } from "../mainClient";
import moment from "moment";
import { generateExcel } from "../generateExcel";
import "./indedx.css";

var serverUrl = window.serverUrl;
console.log("serverUrl: ", serverUrl);

var focusUrl = window.focusUrl;
console.log("focusUrl: ", focusUrl);

const customStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 13,
    width: "200px",
  }),
  //  "dropdown-content": (provided) => ({ ...provided }),

  control: (provided) => ({
    ...provided,
    borderColor: "#868e96",
    width: "200px",
    // zIndex: 9,
    // Add custom styles for the control (container)
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
const customStylesTable = {
  menu: (provided) => ({
    ...provided,

    width: "250px",
  }),

  control: (provided) => ({
    ...provided,
    borderColor: "#868e96",
    width: "250px",
    height: "10px", // Set your desired height here
    padding: "0px",

    // Add custom styles for the control (container)
  }),

  singleValue: (provided) => ({
    ...provided,

    // Add custom styles for the selected value
    color: "black", // Change the text color to red as an example
    fontSize: "13px", // Set the font size
    fontWeight: "400", // Set the font weight
    padding: "0px",
  }),
};
const customStylesTable2 = {
  menu: (provided) => ({
    ...provided,

    width: "90px",
  }),

  control: (provided) => ({
    ...provided,
    borderColor: "#868e96",
    width: "90px",
    height: "10px", // Set your desired height here
    padding: "0px",

    // Add custom styles for the control (container)
  }),

  singleValue: (provided) => ({
    ...provided,

    // Add custom styles for the selected value
    color: "black", // Change the text color to red as an example
    fontSize: "13px", // Set the font size
    fontWeight: "400", // Set the font weight
    padding: "0px",
  }),
};

const deliveryStatusArray = [
  { label: "No", value: "No" },
  { label: "Yes", value: "Yes" },
];
const POStatusArray = [
  { label: "Not released order", value: "Not released order" },
  { label: "Released order", value: "Released order" },
  { label: "Work in progress", value: "Work in progress" },
  { label: "Finished", value: "Finished" },
  { label: "Closed", value: "Closed" },
];

const parseDate = (dateString) => {
  return moment(dateString, "DD-MM-YYYY", true).isValid()
    ? moment(dateString, "DD-MM-YYYY")
    : moment(dateString); // Adjust the parsing format based on your data
};

const groupByMonth = (data) => {
  return data.reduce((groups, voucher) => {
    const dueDate = parseDate(voucher["DueDate"]); // Use the parseDate function
    if (!dueDate.isValid()) return groups; // Skip invalid dates

    const month = dueDate.format("YYYY-MM");
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(voucher);
    return groups;
  }, {});
};

class SalesOrder extends Component {
  currentDate = new Date();

  year = this.currentDate.getFullYear();
  // startMonth = String(this.currentDate.getMonth() - 6 + 1).padStart(2, "0");
  month = String(this.currentDate.getMonth() + 1).padStart(2, "0");
  day = String(this.currentDate.getDate()).padStart(2, "0");

  // Clone the current date and subtract 6 months
  sixMonthsAgo = new Date(
    this.currentDate.setMonth(this.currentDate.getMonth() - 6)
  );

  sixMonthsLater = new Date(
    this.currentDate.setFullYear(this.currentDate.getFullYear() + 1)
  );
  // Get the year, month, and day for the date six months ago
  startYear = this.sixMonthsAgo.getFullYear();
  startMonth = String(this.sixMonthsAgo.getMonth() + 1).padStart(2, "0");
  startDay = String(this.sixMonthsAgo.getDate()).padStart(2, "0");
  toYear = this.sixMonthsLater.getFullYear();
  toMonth = String(this.sixMonthsLater.getMonth() + 1).padStart(2, "0");
  toDay = String(this.sixMonthsLater.getDate()).padStart(2, "0");

  formattedStartDate = `${this.startYear}-${this.startMonth}-${this.startDay}`;
  formattedDate = `${this.toYear}-${this.toMonth}-${this.toDay}`;

  state = {
    ssId: "",
    headerData: {},
    startDate: `${this.year}-${this.month}-${this.day}`,
    // endDate as current date in yyyy-mm-dd format
    endDate: `${this.year}-${this.month}-${this.day}`,
    // endDate: this.formattedDate,
    selectedProject: [],
    isloading: false,
    isCheckedAll: false,
    loadDataResponse: [],
    searchItem: "",
    sortConfig: { key: null, direction: "asc" },
  };

  // executesqlquery = `http://localhost:90/focus8API/utility/executesqlquery`; //query excecution
  executesqlquery = `${focusUrl}/focus8API/utility/executesqlquery`; //query excecution
  async fetchDataFromApi(url, requestData) {
    try {
      this.setState({
        isloading: true,
      });
      const response = await fetch(url, {
        ...(requestData !== "" ? { method: "POST" } : { method: "GET" }),
        headers: {
          "Content-Type": "application/json",
          fSessionId: sessionId,
        },

        ...(requestData !== "" && { body: JSON.stringify(requestData) }),
      });
      console.log(`${url}, response`, response);
      if (!response?.ok) {
        this.setState({
          isloading: false,
        });
        throw new Error("Network response was not ok");
      }
      const data = await response?.json();
      if (data?.result === 1) {
        console.log("JsonData", data);
        this.setState({
          isloading: false,
        });

        return data;
      } else {
        // alert(data?.message);
        this.setState({
          isloading: false,
        });
        console.log("fetchDataFromApi", data, "message: ", data?.message);
        return data;
      }
    } catch (error) {
      this.setState({
        isloading: false,
      });

      console.error("There was a problem with the fetch request:", error);
      // alert(error?.message);
      return;
    } finally {
      this.setState({
        isloading: false,
      });
    }
  }
  componentDidMount() {
    getSessionId();
    this.waitForResponse();
  }

  // getting SessionId
  waitForResponse = async () => {
    if (typeof sessionId !== "undefined") {
      this.setState({
        ssId: sessionId,
        startDate: AccountDate,
      });
      this.getHeaderData();
    } else {
      setTimeout(this.waitForResponse, 1);
    }
  };

  async getHeaderData() {
    var projectMQuery = `select p.sName [label], p.iMasterId [value],up.ProjectStatus from mCore_project p
join muCore_project up on up.iMasterId = p.iMasterId
where up.ProjectStatus = 2;`;

    const mianBodydata = {
      data: [
        {
          Query: `${projectMQuery}`,
        },
      ],
    };
    const projectMResponse = await this.fetchDataFromApi(
      this.executesqlquery,
      mianBodydata
    );
    debugger;
    var projectMData;
    if (
      projectMResponse &&
      projectMResponse?.data &&
      projectMResponse?.result === 1 &&
      projectMResponse?.data?.[0]?.Table &&
      projectMResponse?.data?.[0]?.Table?.length > 0
    ) {
      projectMData = projectMResponse?.data?.[0]?.Table;
    }

    this.setState({
      headerData: projectMData,
    });
  }
  // setting the screen to intitial State
  toInitial() {
    this.setState({ isloading: false });
  }

  renderLoadingView = () => (
    <>
      <div
        className="products-loader-container"
        tabIndex="0"
        onKeyDown={(e) => e.preventDefault()}
        onKeyUp={(e) => e.preventDefault()}
      >
        <div>
          <ThreeDots type="ThreeDots" color="#0073AA" height="50" width="50" />
          <p
            style={{
              // lightgray color
              color: "#868e96",
              fontSize: "16px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Please wait...
          </p>
        </div>
        {/* <p className="products-loader-text">Loading...</p> */}
      </div>
    </>
  );

  // apiCall for master Validations
  apiCall = async (url, sCodeArray) => {
    const Options = {
      origin: "*",
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sCodeArray: sCodeArray,
        companyCode: `${companyCode}`,
      }),
    };
    var apiResponse;
    try {
      await fetch(`${serverUrl}${url}`, Options)
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(`${serverUrl}${url} => jsonData: `, jsonData);
          apiResponse = jsonData;
          if (typeof apiResponse !== "undefined" && "ErrMsg" in apiResponse) {
            console.log("Error:", apiResponse.ErrMsg);
            alert("Internal Server Error");
            this.toInitial();
          }
        });
    } catch (error) {
      console.log(`Error at running: ${serverUrl}${url} => ${error}`);
      alert("Internal Server Error");
      this.toInitial();
    }
    return apiResponse;
  };

  closeModule = () => {
    const isClose = window.confirm(
      "Do you want to close the Purchase Planning Module"
    );
    if (isClose === true) {
      Focus8WAPI.gotoHomePage();
    } else {
      return;
    }
  };

  // integer to date

  intToDate = (intDate) => {
    // Extracting day, month, and year from the integer
    var year = Math.floor(intDate / 65536);
    var month = Math.floor((intDate % 65536) / 256) - 1; // Months are zero-based
    var day = intDate % 256;
    // Creating a new Date object
    var date = new Date(year, month, day);
    // console.log("lrDate: ", date);
    return date.toLocaleDateString();
  };

  dateToInt = (date) => {
    var postingIntDate =
      new Date([date]).getDate() +
      (new Date([date]).getMonth() + 1) * 256 +
      new Date([date]).getFullYear() * 65536;
    return postingIntDate;
  };

  handleSelectedsDate = async (date) => {
    debugger;
    console.log(date.target.value);
    this.setState({ startDate: date.target.value, loadDataResponse: [] });
  };
  handleSelectedeDate = async (date) => {
    console.log(date.target.value);
    this.setState({ endDate: date.target.value, loadDataResponse: [] });
  };
  handleSelectProject = async (selected) => {
    console.log("handleSelectProject", selected);
    this.setState({ selectedProject: selected, loadDataResponse: [] });
  };

  onLoad = async () => {
    const { startDate, endDate, selectedProject } = this.state;
    var loadAlert = [];
    if (startDate === "") {
      loadAlert.push("From Date");
    }
    if (endDate === "") {
      loadAlert.push("To Date");
    }
    if (selectedProject?.length === 0) {
      loadAlert.push("Project");
    }

    if (loadAlert.length !== 0) {
      alert(`Please the following:\n${loadAlert.join(", ")}`);
    } else {
      const startDateInt = this.dateToInt(startDate);
      const endDateInt = this.dateToInt(endDate);
      const selectedProjectString = selectedProject
        .map((item) => item.value)
        .join(",");
      const loadQuery1 = `
      Declare @fromDate int = ${startDateInt};
Declare @toDate int = ${endDateInt};
--Declare @projectId int = ${selectedProjectString};

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    up.ItemModelNo,
    up.Make, 
    up.Size,
    MAX(up.sDescription) AS sDescription,
    SUM(ISNULL(I.fQuantity, 0)) AS totalQtyReqProject, 
	SUM(ISNULL((ssoRM.totalQtyRM),0)+ISNULL((ssoFG.totalQtyFG),0)) AS totalQtyReqSSalesOrder,
    MAX(ISNULL(pmi.totalQtyConsumProject, 0)) AS totalQtyConsumProject,
    MAX(ISNULL(sdc.totalQtyConsumSDC, 0)) AS totalQtyConsumSDC,
    SUM(ISNULL(pmi.totalQtyConsumProject, 0) + ISNULL(sdc.totalQtyConsumSDC, 0)) AS totalconsum,
    MAX(ISNULL(boqpr.boqPRBalance, 0)) AS totalBoqPRBalance,
    SUM(ISNULL(boqIPO.boqIPOBalance, 0) + ISNULL(boqPO.boqPOBalance, 0)) AS totalBoqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
	 MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
-- stock by warehouse
left JOIN (
(select isnull((recv-issue),0) bal,iProduct from(select abs(sum(fQiss)) issue,sum(fQrec) recv, iProduct from vCore_ibals_0 
where 
iInvTag in (select w.iMasterId from mCore_Warehouse w
join muCore_Warehouse uw on uw.iMasterId = w.iMasterId where uw.PPWarehouse = 1)
group by iProduct
)
s )
)ppwh on ppwh.iProduct = i.iProduct
left JOIN (
(select isnull((recv-issue),0) bal,iProduct from(select abs(sum(fQiss)) issue,sum(fQrec) recv, iProduct from vCore_ibals_0 
where 
iInvTag in (select w.iMasterId from mCore_Warehouse w
join muCore_Warehouse uw on uw.iMasterId = w.iMasterId where uw.SpareWH = 1)
group by iProduct
)
s )
)swh on swh.iProduct = i.iProduct
left JOIN (
-- Spares Sales Order
SELECT 
iProduct,
SUM(abs(I.fQuantity)) AS totalQtyRM
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
join mCore_Product p on p.iMasterId = i.iProduct
WHERE h.iVoucherType = 5636 and iProductType not in (3,4) AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY iProduct
)ssoRM on ssoRM.iProduct = i.iProduct
left JOIN (
-- Spares Sales Order
select sum(bb.fQty) totalQtyFG, bb.iProductId from 
mMRP_BomVariantHeader BVH  
 Join mMRP_BomHeader BH On BH.iBomId = BVH.iBomId  
 Join mMRP_BOMBody BB On BB.iVariantId = BVH.iVariantId
where bInput = 1 and bh.iBomId in (select  
distinct BH.iBomId
FROM mMRP_BomVariantHeader BVH  
 Join mMRP_BomHeader BH On BH.iBomId = BVH.iBomId  
 Join mMRP_BOMBody BB On BB.iVariantId = BVH.iVariantId               
where  
BB.iProductId in (SELECT distinct
iProduct
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
join mCore_Product p on p.iMasterId = i.iProduct
WHERE h.iVoucherType = 5636 and p.iProductType in (3,4) AND h.iDate BETWEEN @fromDate AND @toDate -- AND dt.iTag3002 in (${selectedProjectString})
) and BB.bMainOutPut = 1 --fg item from Spares Sales Order
)
group by bb.iProductId
)ssoFG on ssoFG.iProductId = i.iProduct
left JOIN (
    SELECT 
        iProduct, 
        SUM(abs(I.fQuantity)) AS totalQtyConsumProject
    FROM tCore_Header_0 h
    JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
    JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
    left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
    WHERE h.iVoucherType = 5382  AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
    GROUP BY iProduct
) pmi ON pmi.iProduct = i.iProduct
left JOIN (
    SELECT 
        iProduct, 
        SUM(abs(I.fQuantity)) AS totalQtyConsumSDC
    FROM tCore_Header_0 h
    JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
    JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
    left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
    WHERE h.iVoucherType = 6146 AND h.iDate BETWEEN @fromDate AND @toDate  --AND dt.iTag3002 in (${selectedProjectString})
    GROUP BY iProduct
) sdc ON sdc.iProduct = i.iProduct
left Join(
SELECT DISTINCT
SUM(vCore_Links520227331_0.Balance)[boqPRBalance], tCore_Indta_0.iProduct
FROM tCore_Header_0  WITH(READUNCOMMITTED) 
JOIN tCore_Data_0  WITH(READUNCOMMITTED)  ON tCore_Data_0.iHeaderId = tCore_Header_0.iHeaderId 
JOIN tCore_Indta_0  WITH(READUNCOMMITTED)  ON tCore_Indta_0.iBodyId = tCore_Data_0.iBodyId 
left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = tCore_Data_0.iBodyId
LEFT JOIN vCore_AllLinks520227331_0 vCore_Links520227331_0 ON vCore_Links520227331_0.iRefId = tCore_Data_0.iTransactionId 
WHERE tCore_Header_0.iVoucherType=7938 AND (bVersion IS NULL OR bVersion = 0) AND tCore_Header_0.bDraft = 0 
AND tCore_Header_0.iDate BETWEEN @fromDate AND @toDate-- AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
tCore_Indta_0.iProduct
)boqpr on boqpr.iProduct = i.iProduct
left join(
--BOQ-Import Purchase order
SELECT DISTINCT
SUM(vCore_Links168101124_0.Balance)[boqIPOBalance], tCore_Indta_0.iProduct
FROM tCore_Header_0  WITH(READUNCOMMITTED) 
JOIN tCore_Data_0  WITH(READUNCOMMITTED)  ON tCore_Data_0.iHeaderId = tCore_Header_0.iHeaderId 
JOIN tCore_Indta_0  WITH(READUNCOMMITTED)  ON tCore_Indta_0.iBodyId = tCore_Data_0.iBodyId 
left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = tCore_Data_0.iBodyId
LEFT JOIN vCore_AllLinks168101124_0 vCore_Links168101124_0 ON vCore_Links168101124_0.iRefId = tCore_Data_0.iTransactionId 
WHERE tCore_Header_0.iVoucherType=2565 AND (bVersion IS NULL OR bVersion = 0) AND tCore_Header_0.bDraft = 0 
AND tCore_Header_0.iDate BETWEEN @fromDate AND @toDate-- AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
tCore_Indta_0.iProduct
)boqIPO on boqIPO.iProduct = i.iProduct
left join(

--BOQ-Purchase Order
SELECT DISTINCT
SUM(vCore_Links167970050_0.Balance)[boqPOBalance], tCore_Indta_0.iProduct
FROM tCore_Header_0  WITH(READUNCOMMITTED) 
JOIN tCore_Data_0  WITH(READUNCOMMITTED)  ON tCore_Data_0.iHeaderId = tCore_Header_0.iHeaderId 
JOIN tCore_Indta_0  WITH(READUNCOMMITTED)  ON tCore_Indta_0.iBodyId = tCore_Data_0.iBodyId 
left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = tCore_Data_0.iBodyId
LEFT JOIN vCore_AllLinks167970050_0 vCore_Links167970050_0 ON vCore_Links167970050_0.iRefId = tCore_Data_0.iTransactionId 
WHERE tCore_Header_0.iVoucherType=2563 AND (bVersion IS NULL OR bVersion = 0) AND tCore_Header_0.bDraft = 0 
AND tCore_Header_0.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
tCore_Indta_0.iProduct
)boqPO on boqPO.iProduct = i.iProduct
left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 7941 AND h.iDate BETWEEN @fromDate AND @toDate AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct, 
    up.ItemModelNo,
    up.Make, 
    up.Size;

      `;
      const loadQuery2 = `
       Declare @fromDate int = ${startDateInt};
Declare @toDate int = ${endDateInt};
--Declare @projectId int = ${selectedProjectString};

SELECT 
itemName, 
  itemCode, 
    s.iProduct, 
    MAX(ISNULL(ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(Make, '')) AS Make, 
    MAX(ISNULL(Size, '')) AS Size,
    MAX(sDescription) AS sDescription,
    SUM(ISNULL(totalQtyReqProject, 0)) AS totalQtyReqProject, 
	SUM(ISNULL(totalQtyReqSSalesOrder, 0)) AS totalQtyReqSSalesOrder,
	SUM(ISNULL(totalQtyConsumProject, 0)) AS totalQtyConsumProject,
    SUM(ISNULL(totalQtyConsumSDC, 0)) AS totalQtyConsumSDC,
    SUM(ISNULL(totalconsum, 0)) AS totalconsum,
    SUM(ISNULL(totalBoqPRBalance, 0)) AS totalBoqPRBalance,
	SUM(ISNULL(boqIPOBalance, 0)) AS boqIPOBalance,
   SUM(ISNULL(boqPOBalance, 0)) AS boqPOBalance,
   SUM(ISNULL(boqIPOBalance, 0))+SUM(ISNULL(boqPOBalance, 0)) AS totalBoqPOBalance,
    MAX(ISNULL(iSupplier0, '')) AS iSupplier0,
    MAX(ISNULL(iSupplier1, '')) AS iSupplier1,
    MAX(ISNULL(iSupplier2, '')) AS iSupplier2,
    MAX(ISNULL(LeadTime, 0)) AS LeadTime,
	 MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 MAX(ISNULL(swh.bal, 0)) AS spareWnetQty

FROM

(

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
	0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
   SUM(ISNULL(vCore_Links167970050_0.Balance, 0)) AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
LEFT JOIN vCore_AllLinks167970050_0 vCore_Links167970050_0 ON vCore_Links167970050_0.iRefId = d.iTransactionId 

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 2563 AND (bVersion IS NULL OR bVersion = 0) AND h.bDraft = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
--BOQ-Purchase Order
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct
UNION ALL
SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
     MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
 0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	SUM(ISNULL(vCore_Links168101124_0.Balance, 0)) AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
LEFT JOIN vCore_AllLinks168101124_0 vCore_Links168101124_0 ON vCore_Links168101124_0.iRefId = d.iTransactionId 

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 2565 AND (bVersion IS NULL OR bVersion = 0) AND h.bDraft = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
--BOQ-Import Purchase order
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct
UNION ALL

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
     MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
 0 AS totalQtyConsumProject,
   0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    SUM(ISNULL(vCore_Links520227331_0.Balance, 0)) AS totalBoqPRBalance,
    0 boqIPOBalance,
	0 boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
LEFT JOIN vCore_AllLinks520227331_0 vCore_Links520227331_0 ON vCore_Links520227331_0.iRefId = d.iTransactionId 


left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 7938 AND (bVersion IS NULL OR bVersion = 0) AND h.bDraft = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct

UNION ALL

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
0 AS totalQtyConsumProject,
    SUM(abs(ISNULL(I.fQuantity, 0))) AS totalQtyConsumSDC,
    0 AS totalconsum,
   0 AS totalBoqPRBalance,
   0 AS boqIPOBalance,
   0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 6146 and iProduct not in (select iProductId from mMRP_BOMBody where bMainOutPut = 1) AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct

UNION ALL

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
     SUM(abs(ISNULL(I.fQuantity, 0))) AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 5382 AND h.iDate BETWEEN @fromDate AND @toDate AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct

UNION ALL

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
	 i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	SUM(ISNULL((ssoRM.totalQtyRM),0)) AS totalQtyReqSSalesOrder,
    0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId

JOIN (
-- Spares Sales Order
SELECT 
iProduct,
SUM(abs(I.fQuantity)) AS totalQtyRM
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
join mCore_Product p on p.iMasterId = i.iProduct
WHERE h.iVoucherType = 5636 and iProductType not in (3,4) AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY iProduct
)ssoRM on ssoRM.iProduct = i.iProduct




left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 5636  AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct

	UNION ALL

	
SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
	 i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
   SUM(ISNULL(I.fQuantity, 0)) AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
    0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 7941 AND h.iDate BETWEEN @fromDate AND @toDate AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct
	)
	s
	-- stock by warehouse
left JOIN (
(select isnull((recv-issue),0) bal,iProduct from(select abs(sum(fQiss)) issue,sum(fQrec) recv, iProduct from vCore_ibals_0 
where 
iInvTag in (select w.iMasterId from mCore_Warehouse w
join muCore_Warehouse uw on uw.iMasterId = w.iMasterId where uw.PPWarehouse = 1)
group by iProduct
)
s )
)ppwh on ppwh.iProduct = s.iProduct
left JOIN (
(select isnull((recv-issue),0) bal,iProduct from(select abs(sum(fQiss)) issue,sum(fQrec) recv, iProduct from vCore_ibals_0 
where 
iInvTag in (select w.iMasterId from mCore_Warehouse w
join muCore_Warehouse uw on uw.iMasterId = w.iMasterId where uw.SpareWH = 1)
group by iProduct
)
s )
)swh on swh.iProduct = s.iProduct
	GROUP BY 
    itemName, 
    itemCode, 
   s.iProduct
      `;
      const loadQuery = `
      Declare @fromDate int = ${startDateInt};
Declare @toDate int = ${endDateInt};
SELECT 
itemName, 
  itemCode, 
    s.iProduct, 
    MAX(ISNULL(ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(Make, '')) AS Make, 
    MAX(ISNULL(Size, '')) AS Size,
    MAX(sDescription) AS sDescription,
    SUM(ISNULL(totalQtyReqProject, 0)) AS totalQtyReqProject, 
	SUM(ISNULL(totalQtyReqSSalesOrder, 0)) AS totalQtyReqSSalesOrder,
	SUM(ISNULL(totalQtyConsumProject, 0)) AS totalQtyConsumProject,
    SUM(ISNULL(totalQtyConsumSDC, 0)) AS totalQtyConsumSDC,
    SUM(ISNULL(totalconsum, 0)) AS totalconsum,
    SUM(ISNULL(totalBoqPRBalance, 0)) AS totalBoqPRBalance,
	SUM(ISNULL(boqIPOBalance, 0)) AS boqIPOBalance,
   SUM(ISNULL(boqPOBalance, 0)) AS boqPOBalance,
   SUM(ISNULL(boqIPOBalance, 0))+SUM(ISNULL(boqPOBalance, 0)) AS totalBoqPOBalance,
    MAX(ISNULL(iSupplier0, '')) AS iSupplier0,
    MAX(ISNULL(iSupplier1, '')) AS iSupplier1,
    MAX(ISNULL(iSupplier2, '')) AS iSupplier2,
    MAX(ISNULL(LeadTime, 0)) AS LeadTime,
	 MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 MAX(ISNULL(swh.bal, 0)) AS spareWnetQty,
   MAX(IsBOQItem) IsBOQItem,
   MAX(fReorderLevel) fReorderLevel,
   MAX(totalGenPRBalance) AS totalGenPRBalance,
    MAX(totalGenPOBalance) AS totalGenPOBalance

FROM

(

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
	0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
   SUM(ISNULL(vCore_Links167970050_0.Balance, 0)) AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
    0 AS totalGenPRBalance,
     0 AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
LEFT JOIN vCore_AllLinks167970050_0 vCore_Links167970050_0 ON vCore_Links167970050_0.iRefId = d.iTransactionId 

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 2563 and h.bSuspended = 0 AND (bVersion IS NULL OR bVersion = 0) AND h.bDraft = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
--BOQ-Purchase Order
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct
UNION ALL
SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
     MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
 0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	SUM(ISNULL(vCore_Links168101124_0.Balance, 0)) AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
    0 AS totalGenPRBalance,
     0 AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
LEFT JOIN vCore_AllLinks168101124_0 vCore_Links168101124_0 ON vCore_Links168101124_0.iRefId = d.iTransactionId 

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 2565 and h.bSuspended = 0 AND (bVersion IS NULL OR bVersion = 0) AND h.bDraft = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
--BOQ-Import Purchase order
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct
UNION ALL

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
     MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
 0 AS totalQtyConsumProject,
   0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    SUM(ISNULL(vCore_Links520227331_0.Balance, 0)) AS totalBoqPRBalance,
    0 boqIPOBalance,
	0 boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
    0 AS totalGenPRBalance,
     0 AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
LEFT JOIN vCore_AllLinks520227331_0 vCore_Links520227331_0 ON vCore_Links520227331_0.iRefId = d.iTransactionId 


left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 7938 and h.bSuspended = 0 AND (bVersion IS NULL OR bVersion = 0) AND h.bDraft = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct

UNION ALL

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
0 AS totalQtyConsumProject,
    SUM(abs(ISNULL(I.fQuantity, 0))) AS totalQtyConsumSDC,
    0 AS totalconsum,
   0 AS totalBoqPRBalance,
   0 AS boqIPOBalance,
   0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
    0 AS totalGenPRBalance,
     0 AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 6146 and h.bSuspended = 0 
--and iProduct not in (select iProductId from mMRP_BOMBody where bMainOutPut = 1) 
AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct

UNION ALL

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
     SUM(abs(ISNULL(I.fQuantity, 0))) AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
    0 AS totalGenPRBalance,
     0 AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 5382 and h.bSuspended = 0 AND h.iDate BETWEEN @fromDate AND @toDate AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct

UNION ALL

SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
	p.iMasterId AS iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	--SUM(ISNULL((ssoRM.totalQtyRM),0)+ISNULL((ssoFG.totalQtyFG),0)) AS totalQtyReqSSalesOrder,
	MAX(ISNULL((ssoRM.totalQtyRM),0)) AS totalQtyReqSSalesOrder,
    0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
    0 AS totalGenPRBalance,
     0 AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId

 JOIN (
-- Spares Sales Order
SELECT 
iProduct,
SUM(abs(I.fQuantity)) AS totalQtyRM
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
left JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
join mCore_Product p on p.iMasterId = i.iProduct
--join muCore_Product ep on ep.iMasterId = p.iMasterId
WHERE h.iVoucherType = 5636 and h.bSuspended = 0 
--and iProductType not in (3,4) 
--and ep.IsBOQItem <> 2
AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY iProduct
)ssoRM on ssoRM.iProduct = i.iProduct

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 5636 and h.bSuspended = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
	p.iMasterId

	UNION ALL
	
SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
	 i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
   SUM(ISNULL(I.fQuantity, 0)) AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
    0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
    0 AS totalGenPRBalance,
     0 AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 7941 and h.bSuspended = 0 AND h.iDate BETWEEN @fromDate AND @toDate AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct
UNION ALL
SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
     MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
 0 AS totalQtyConsumProject,
   0 AS totalQtyConsumSDC,
    0 AS totalconsum,
   0 AS totalBoqPRBalance,
    0 boqIPOBalance,
	0 boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
	SUM(ISNULL(vCore_Links520161794_0.Balance, 0)) AS totalGenPRBalance,
  0 AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
LEFT JOIN vCore_AllLinks520161794_0 vCore_Links520161794_0 ON vCore_Links520161794_0.iRefId = d.iTransactionId 


left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 7937 and h.bSuspended = 0 AND (bVersion IS NULL OR bVersion = 0) AND h.bDraft = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct 
  
  UNION ALL
  SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
     MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
 0 AS totalQtyConsumProject,
   0 AS totalQtyConsumSDC,
    0 AS totalconsum,
   0 AS totalBoqPRBalance,
    0 boqIPOBalance,
	0 boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
	0 AS totalGenPRBalance,
	SUM(ISNULL(vCore_Links167904513_0.Balance, 0)) AS totalGenPOBalance
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
LEFT JOIN vCore_AllLinks167904513_0 vCore_Links167904513_0 ON vCore_Links167904513_0.iRefId = d.iTransactionId 


left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 2562 and h.bSuspended = 0 AND (bVersion IS NULL OR bVersion = 0) AND h.bDraft = 0 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct
	)
	s
	-- stock by warehouse
left JOIN (
(select isnull((recv-issue),0) bal,iProduct from(select abs(sum(fQiss)) issue,sum(fQrec) recv, iProduct from vCore_ibals_0 
where 
iInvTag in (select w.iMasterId from mCore_Warehouse w
join muCore_Warehouse uw on uw.iMasterId = w.iMasterId where uw.PPWarehouse = 1)
group by iProduct
)
s )
)ppwh on ppwh.iProduct = s.iProduct
left JOIN (
(select isnull((recv-issue),0) bal,iProduct from(select abs(sum(fQiss)) issue,sum(fQrec) recv, iProduct from vCore_ibals_0 
where 
iInvTag in (select w.iMasterId from mCore_Warehouse w
join muCore_Warehouse uw on uw.iMasterId = w.iMasterId where uw.SpareWH = 1)
group by iProduct
)
s )
)swh on swh.iProduct = s.iProduct

	GROUP BY 
    itemName, 
    itemCode, 
   s.iProduct;
SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    SUM(abs(ISNULL(I.fQuantity, 0))) AS totalQtyReqSSalesOrder,
    h.sVoucherNo
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product ep ON ep.iMasterId = p.iMasterId
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId

WHERE h.iVoucherType = 5636 and h.bSuspended = 0 
and ep.IsBOQItem = 2
--and i.iProduct in (select iProductId from mMRP_BOMBody where bMainOutPut = 1)
 AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (${selectedProjectString})
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct,
    h.sVoucherNo;
   `;
      console.log("loadQuery", loadQuery);

      const loadData = {
        data: [
          {
            Query: `${loadQuery}`,
          },
        ],
      };
      const loadResponse = await this.fetchDataFromApi(
        this.executesqlquery,
        loadData
      );
      // console.log("loadResponse", loadResponse);
      var loadDataResponse;
      if (
        loadResponse &&
        loadResponse?.data &&
        loadResponse?.result === 1 &&
        loadResponse?.data?.[0]?.Table &&
        loadResponse?.data?.[0]?.Table?.length > 0
      ) {
        loadDataResponse = loadResponse?.data?.[0]?.Table;
        // sum of totalQTYReqProject
        let sumoftotalQTYReqProject1 = loadDataResponse.reduce(
          (acc, item) => acc + (parseFloat(item.totalQtyReqProject) || 0),
          0
        );
        console.log("Sum of totalQtyReqProject1:", sumoftotalQTYReqProject1);
        // this.setState({
        //   loadDataResponse: loadDataResponse,
        // });
      } else {
        loadDataResponse = [];
        this.setState({
          loadDataResponse: loadDataResponse,
        });
        // alert("No Data Found");
      }

      // spare sales order fg item qty
      if (
        loadResponse?.data?.[0]?.Table1 &&
        loadResponse?.data?.[0]?.Table1.length > 0
      ) {
        const spareDC = loadResponse?.data?.[0]?.Table1;
        for (let i = 0; i < spareDC.length; i++) {
          const spareDcRow = spareDC[i];

          const spareDCConsumedQuery2 = `SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
	p.iMasterId AS iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	--SUM(ISNULL((ssoRM.totalQtyRM),0)+ISNULL((ssoFG.totalQtyFG),0)) AS totalQtyReqSSalesOrder,
  0 AS totalQtyReqSSalesOrder,
ISNULL(SUM(abs(I.fQuantity)),0) AS totalPOPlanningQty,
    0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
    0 AS totalBoqPRBalance,
	0 AS boqIPOBalance,
	0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
	MAX(ISNULL(eh.SOItem,0)) SOItem, 
	MAX(ISNULL(eh.SONo,'')) SONo,
  MAX(p.fReorderLevel) fReorderLevel,
  MAX(up.IsBOQItem) IsBOQItem
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
JOIN tCore_HeaderData7949_0 eh on eh.iHeaderId = h.iHeaderId
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId
left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 7949 and h.bSuspended = 0 --AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (9)
AND eh.SONo = '${spareDcRow?.sVoucherNo}' and eh.SOItem = ${spareDcRow?.iProduct}
GROUP BY 
    p.sName, 
    p.sCode, 
	p.iMasterId`;

          const spareDCConsumedResponse = await this.fetchDataFromApi(
            this.executesqlquery,
            {
              data: [
                {
                  Query: `${spareDCConsumedQuery2}`,
                },
              ],
            }
          );
          // console.log("spareDCConsumedResponse", spareDCConsumedResponse);
          if (
            spareDCConsumedResponse &&
            spareDCConsumedResponse?.data &&
            spareDCConsumedResponse?.result === 1 &&
            spareDCConsumedResponse?.data?.[0]?.Table &&
            spareDCConsumedResponse?.data?.[0]?.Table.length > 0
          ) {
            const spareDcConsumedData =
              spareDCConsumedResponse?.data?.[0]?.Table;
            // get all iProduct from spareDcConsumedData
            const iProducts = spareDcConsumedData.map((item) => item.iProduct);
            const issueQtyQuery = `
Declare @fromDate int = ${startDateInt};
Declare @toDate int = ${endDateInt};
SELECT 
    p.sName AS itemName, 
    p.sCode AS itemCode, 
    i.iProduct, 
    MAX(ISNULL(up.ItemModelNo, '')) AS ItemModelNo,
    MAX(ISNULL(up.Make, '')) AS Make, 
    MAX(ISNULL(up.Size, '')) AS Size,
    MAX(up.sDescription) AS sDescription,
    0 AS totalQtyReqProject, 
	0 AS totalQtyReqSSalesOrder,
0 AS totalQtyConsumProject,
    0 AS totalQtyConsumSDC,
    0 AS totalconsum,
   0 AS totalBoqPRBalance,
   0 AS boqIPOBalance,
   0 AS boqPOBalance,
    MAX(ISNULL(pod0.sName, '')) AS iSupplier0,
    MAX(ISNULL(pod1.sName, '')) AS iSupplier1,
    MAX(ISNULL(pod2.sName, '')) AS iSupplier2,
    MAX(ISNULL(up.LeadTime, 0)) AS LeadTime,
    MAX(up.IsBOQItem) IsBOQItem,
    MAX(p.fReorderLevel) fReorderLevel,
    0 AS totalGenPRBalance,
     0 AS totalGenPOBalance,
	 SUM(abs(ISNULL(I.fQuantity, 0))) AS totalIssueQty
	 --MAX(ISNULL(ppwh.bal, 0)) AS ppWhnetQty,
	 --MAX(ISNULL(swh.bal, 0)) AS spareWnetQty
FROM tCore_Header_0 h
JOIN tCore_Data_0 d ON d.iHeaderId = h.iHeaderId
JOIN tCore_Indta_0 i ON i.iBodyId = d.iBodyId
JOIN mCore_Product p ON p.iMasterId = i.iProduct
JOIN muCore_Product up ON up.iMasterId = i.iProduct
LEFT JOIN tCore_Data_Tags_0 dt ON dt.iBodyId = d.iBodyId

left join  (select podd0.iMasterId, iSupplier, ac0.sName from
	muCore_Product_OtherDetails_Details podd0
	join mCore_Account ac0 on ac0.iMasterId = podd0.iSupplier
	where iRowIndex = 0) pod0 on pod0.iMasterId = i.iProduct
left join  (select podd1.iMasterId, iSupplier, ac1.sName from
	muCore_Product_OtherDetails_Details podd1
	join mCore_Account ac1 on ac1.iMasterId = podd1.iSupplier
	where iRowIndex = 1) pod1 on pod1.iMasterId = i.iProduct
left join  (select podd2.iMasterId, iSupplier, ac2.sName from
	muCore_Product_OtherDetails_Details podd2
	join mCore_Account ac2 on ac2.iMasterId = podd2.iSupplier
	where iRowIndex = 2) pod2 on pod2.iMasterId = i.iProduct
WHERE h.iVoucherType = 5386 and h.bSuspended = 0 
and iProduct in (${iProducts.join(",")}) 
AND h.iDate BETWEEN @fromDate AND @toDate --AND dt.iTag3002 in (9)
GROUP BY 
    p.sName, 
    p.sCode, 
    i.iProduct`;
            const issueQtyResponse = await this.fetchDataFromApi(
              this.executesqlquery,
              {
                data: [
                  {
                    Query: `${issueQtyQuery}`,
                  },
                ],
              }
            );
            if (
              issueQtyResponse &&
              issueQtyResponse?.data &&
              issueQtyResponse?.result === 1 &&
              issueQtyResponse?.data?.[0]?.Table &&
              issueQtyResponse?.data?.[0]?.Table.length > 0
            ) {
              const issueQtyData = issueQtyResponse?.data?.[0]?.Table;
              loadDataResponse.push(...issueQtyData);
            }
            // console.log("spareDcConsumedData", spareDcConsumedData);
            for (let j = 0; j < spareDcConsumedData.length; j++) {
              const spareDCConsumedRMQTY = spareDcConsumedData[j];
              // multiply totalQtyFG with spareDcRow.totalQtyReqSSalesOrder and assign to totalQtyReqSSalesOrder
              // const totalQtyReqSSalesOrder =
              //   spareDCConsumedRMQTY.totalQtyFG *
              //   spareDcRow.totalQtyReqSSalesOrder;
              // // console.log("totalQtyReqSSalesOrder", totalQtyReqSSalesOrder);
              // spareDCConsumedRMQTY.totalQtyReqSSalesOrder =
              //   totalQtyReqSSalesOrder;
              // push the spareDCConsumedRMQTY to loadDataResponse
              loadDataResponse.push(spareDCConsumedRMQTY);
            }
          }
        }
      }

      // group by itemCode and add the grouped item values

      const groupItemCode = loadDataResponse.reduce((groupDocNo, item) => {
        const group = groupDocNo[item["itemCode"]] || [];
        group.push(item);
        groupDocNo[item["itemCode"]] = group;
        return groupDocNo;
      }, {});
      console.log("Grouped by itemCode:", groupItemCode);

      // adding the all values in grouped item also include other keys also

      const allValuesInGroupedItems = Object.values(groupItemCode).map(
        (group) =>
          group.reduce((acc, item) => {
            const code = item.itemCode;
            if (!acc[code]) {
              // Initialize with a shallow copy of the first item (including strings)
              acc[code] = { ...item };
            } else {
              // Sum numeric fields only
              for (const key in item) {
                if (typeof item[key] === "number") {
                  acc[code][key] = (acc[code][key] || 0) + item[key];
                }
                // Non-numeric keys are kept as is from the first item
              }
            }
            return acc;
          }, {})
      );

      console.log("All values in grouped items:", allValuesInGroupedItems);
      // set the loadDataResponse with [{itemCode:{}}] allValuesInGroupedItems in [{} format], map each item and add object values i.e, is object
      loadDataResponse = allValuesInGroupedItems
        .map((item) => {
          return Object.values(item);
        })
        .flat();
      // sum of totalQTYReqProject
      let sumoftotalQTYReqProject = loadDataResponse.reduce(
        (acc, item) => acc + (parseFloat(item.totalQtyReqProject) || 0),
        0
      );
      console.log("Sum of totalQtyReqProject:", sumoftotalQTYReqProject);

      // getting stock by warehouse
      const stockByWarehouseQuery = `select isnull((recv-issue),0) bal,iProduct from(select abs(sum(fQiss)) issue,sum(fQrec) recv, iProduct from vCore_ibals_0 
where 
iInvTag in (select w.iMasterId from mCore_Warehouse w
join muCore_Warehouse uw on uw.iMasterId = w.iMasterId where uw.PPWarehouse = 1)
group by iProduct
)
s;
select isnull((recv-issue),0) bal,iProduct from(select abs(sum(fQiss)) issue,sum(fQrec) recv, iProduct from vCore_ibals_0 
where 
iInvTag in (select w.iMasterId from mCore_Warehouse w
join muCore_Warehouse uw on uw.iMasterId = w.iMasterId where uw.SpareWH = 1)
group by iProduct
)
s`;

      const stockByWarehouseResponse = await this.fetchDataFromApi(
        this.executesqlquery,
        {
          data: [
            {
              Query: `${stockByWarehouseQuery}`,
            },
          ],
        }
      );
      // console.log("stockByWarehouseResponse", stockByWarehouseResponse);
      if (
        stockByWarehouseResponse &&
        stockByWarehouseResponse?.data &&
        stockByWarehouseResponse?.result === 1 &&
        stockByWarehouseResponse?.data?.[0]?.Table &&
        stockByWarehouseResponse?.data?.[0]?.Table.length > 0
      ) {
        const ppWhnetQty = stockByWarehouseResponse?.data?.[0]?.Table;
        // console.log("ppWhnetQty", ppWhnetQty);
        // map the ppWhnetQty to loadDataResponse if iProduct matches else 0
        loadDataResponse = loadDataResponse.map((item) => {
          const ppWhnetQtyItem = ppWhnetQty.find(
            (qtyItem) => qtyItem.iProduct === item.iProduct
          );
          return {
            ...item,
            ppWhnetQty: ppWhnetQtyItem ? ppWhnetQtyItem.bal : 0,
          };
        });
      }
      if (
        stockByWarehouseResponse &&
        stockByWarehouseResponse?.data &&
        stockByWarehouseResponse?.result === 1 &&
        stockByWarehouseResponse?.data?.[0]?.Table1 &&
        stockByWarehouseResponse?.data?.[0]?.Table1.length > 0
      ) {
        const spareWnetQty = stockByWarehouseResponse?.data?.[0]?.Table1;
        // console.log("spareWnetQty", spareWnetQty);
        // map the spareWnetQty to loadDataResponse if iProduct matches else 0
        loadDataResponse = loadDataResponse.map((item) => {
          const spareWnetQtyItem = spareWnetQty.find(
            (qtyItem) => qtyItem.iProduct === item.iProduct
          );
          return {
            ...item,
            spareWnetQty: spareWnetQtyItem ? spareWnetQtyItem.bal : 0,
          };
        });
      }
      // console.log("loadDataResponse before bomIDs", loadDataResponse);
      // add key Quantity to order by totalQtyReqProject, totalQtyReqSSalesOrder, totalconsum, ppWhnetQty, spareWnetQty

      // in loadDataResponse add column
      loadDataResponse.forEach((item) => {
        item.totalReqSOPO =
          (item.totalQtyReqProject || 0) +
          (item.totalQtyReqSSalesOrder || 0) +
          (item?.totalPOPlanningQty || 0) +
          (item?.fReorderLevel || 0);
        item.totalQtyConsumSOPO =
          (item.totalQtyConsumProject || 0) +
          (item.totalQtyConsumSDC || 0) +
          (item?.totalIssueQty || 0);
        item.totalPOPlanningQty = item.totalPOPlanningQty || 0;
        item.totalIssueQty = item.totalIssueQty || 0;
        item.totalAvailableStock =
          (item.ppWhnetQty || 0) +
          (item.spareWnetQty || 0) +
          (item.totalBoqPRBalance || 0) +
          (item.totalBoqPOBalance || 0) +
          (item.totalGenPRBalance || 0) +
          (item.totalGenPOBalance || 0);
      });

      loadDataResponse = loadDataResponse.map((item) => {
        // const totalQtyReq =
        //   (item.totalQtyReqProject || 0) +
        //   (item.totalQtyReqSSalesOrder || 0) -
        //   (item.totalQtyConsumProject || 0) -
        //   (item.totalQtyConsumSDC || 0) -
        //   (item.ppWhnetQty || 0) -
        //   (item.totalBoqPRBalance || 0) -
        //   (item.totalBoqPOBalance || 0);

        const totalQtyReq =
          item.totalReqSOPO -
          (item.totalQtyConsumSOPO + item.totalAvailableStock);

        // if quantity is less than 0 then add key

        // // if quantity is less than 0 then add key disabled with true
        if (totalQtyReq <= 0 || item.IsBOQItem === 2) {
          return {
            ...item,
            Quantity: totalQtyReq.toFixed(3),
            disabled: true,
          };
        } else {
          return {
            ...item,
            Quantity: totalQtyReq.toFixed(3),
            disabled: false,
          };
        }

        // return {
        //   ...item,
        //   Quantity: totalQtyReq,
        // };
      });
      // order by Quantity in descending order
      loadDataResponse.sort((a, b) => b.Quantity - a.Quantity);

      // console.log("loadDataResponse after bomIDs", loadDataResponse);
      this.setState({
        loadDataResponse: loadDataResponse,
        isloading: false,
      });

      // console.log("loadDataResponse", loadDataResponse);
    }
  };

  onExport = async () => {
    const { loadDataResponse } = this.state;

    // Export logic here
    if (loadDataResponse.length === 0) {
      alert("No data available for export.");
      return;
    }

    generateExcel(loadDataResponse);
  };

  onPost = async () => {
    const { loadDataResponse } = this.state;
    const selectedItems = loadDataResponse.filter((item) => item.selected);
    console.log("Selected items:", selectedItems);

    // Check if at least one item is selected
    if (selectedItems.length === 0) {
      alert("Please select at least one item to post.");
      return;
    } else {
      const bodyData = [];
      for (let i = 0; i < selectedItems.length; i++) {
        const BOQPurchaseRow = selectedItems[i];
        const bodyRow = {
          // Item__Id: BOQPurchaseRow.iProduct,
          Item__Code: BOQPurchaseRow.itemCode,
          Quantity: BOQPurchaseRow.Quantity,
          Description: BOQPurchaseRow.sDescription,
        };
        bodyData.push(bodyRow);
      }
      var BOQPurchaseRequest = JSON.stringify({
        data: [
          {
            Body: bodyData,
            Header: {
              Branch__Code: "LSI",
            },
          },
        ],
      });
      const BOQPurchaseResponse = await this.fetchDataFromApi(
        `${focusUrl}/focus8api/Transactions/7938/`,
        BOQPurchaseRequest
      );
      if (BOQPurchaseResponse?.result === 1) {
        alert(
          `BOQ-Purchase Requisition Posted Successfully: ${BOQPurchaseResponse?.data[0].VoucherNo}`
        );
        this.setState({
          loadDataResponse: [],
          isCheckedAll: false,
        });
      } else {
        alert(
          `BOQ-Purchase Requisition Not Posted: ${BOQPurchaseResponse?.message}`
        );
      }
    }
  };

  toggleCheckbox = (rowIndex) => {
    const { loadDataResponse } = this.state;

    // Toggle selected state of the specific row
    const updatedVouchers = [...loadDataResponse];
    updatedVouchers[rowIndex] = {
      ...updatedVouchers[rowIndex],
      selected: !updatedVouchers[rowIndex].selected,
    };

    // Check if all checkboxes are now selected
    const allSelected = updatedVouchers.every((item) => item.selected);

    this.setState({
      loadDataResponse: updatedVouchers,
      isCheckedAll: allSelected,
    });
  };

  toggleCheckboxAll = () => {
    const { loadDataResponse, isCheckedAll } = this.state;

    // Toggle all checkboxes based on current state
    const updatedVouchers = loadDataResponse.map((voucher) => ({
      ...voucher,
      // select only for the voucher that is not disabled
      // if voucher is disabled then don't change the selected state
      selected: !isCheckedAll && !voucher.disabled,
    }));

    this.setState({
      loadDataResponse: updatedVouchers,
      isCheckedAll: !isCheckedAll,
    });
  };

  handleSort = (key) => {
    const { sortConfig, loadDataResponse } = this.state;

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...loadDataResponse].sort((a, b) => {
      const valA = a[key] ?? 0;
      const valB = b[key] ?? 0;

      // numeric sort
      if (!isNaN(valA) && !isNaN(valB)) {
        return direction === "asc" ? valA - valB : valB - valA;
      }

      // string fallback
      return direction === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    this.setState({
      loadDataResponse: sortedData,
      sortConfig: { key, direction },
    });
  };
  render() {
    const {
      isloading,
      startDate,
      endDate,
      selectedProject,
      headerData,
      loadDataResponse,
      isCheckedAll,
      searchItem,
    } = this.state;
    console.log("loadDataResponse", loadDataResponse);

    // filter on itemName or itemCode
    const filteredItems = loadDataResponse.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.itemCode.toLowerCase().includes(searchItem.toLowerCase())
    );

    const tableWrapStyle =
      filteredItems?.length < 6 ? "d-flex table-wrap-2" : "d-flex table-wrap-1";
    return (
      <div>
        <p className="module_name">Purchase Planning Module</p>
        {isloading && this.renderLoadingView()}

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div className="header_cont">
              <div className="filterContainer">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "250px",
                    gap: "5px",
                  }}
                >
                  <label
                    className="input_label"
                    style={{ margin: "0", padding: "0" }}
                  >
                    From Date
                  </label>
                  <input
                    onChange={(e) => this.handleSelectedsDate(e)}
                    type="date"
                    value={startDate}
                    className="head_input dateSelection"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "250px",
                    gap: "5px",
                  }}
                >
                  <label
                    className="input_label"
                    style={{ margin: "0", padding: "0" }}
                  >
                    To Date
                  </label>
                  <input
                    onChange={(e) => this.handleSelectedeDate(e)}
                    type="date"
                    value={endDate}
                    className="head_input dateSelection"
                  />
                </div>
                {/* projectMaster */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "250px",
                    gap: "5px",
                  }}
                >
                  <label
                    className="ms_label"
                    style={{ margin: "0", padding: "0" }}
                  >
                    Project
                  </label>

                  <MultiSelect
                    className="ms_input customDropdown head_input ms_menu "
                    styles={[customStyles]}
                    options={headerData || []}
                    value={selectedProject}
                    onChange={(e) => this.handleSelectProject(e)}
                    isClearable={true}
                    overrideStrings={{
                      allItemsAreSelected: "All are selected",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems:
                    loadDataResponse?.length !== 0 ? "center" : "center",
                  justifyContent:
                    loadDataResponse?.length !== 0 ? "space-between" : "right",
                  marginTop: "20px",
                  // paddingRight: "20px",
                }}
              >
                {loadDataResponse?.length !== 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "250px",
                      gap: "5px",
                    }}
                  >
                    {/* text box for item search */}
                    <label
                      className="input_label"
                      style={{ margin: "0", padding: "0" }}
                    >
                      Search Item
                    </label>
                    <input
                      type="text"
                      placeholder="Search Item"
                      value={searchItem}
                      style={{
                        width: "200px",
                        padding: "5px",
                        border: "1px solid black",
                        borderRadius: "4px",
                      }}
                      onChange={(e) =>
                        this.setState({ searchItem: e.target.value })
                      }
                    />
                  </div>
                )}

                <div className="btn_container">
                  <button className="btn_post" onClick={this.onLoad}>
                    Load
                  </button>
                  {filteredItems?.length !== 0 && (
                    <button className="btn_post" onClick={this.onExport}>
                      Export to Excel
                    </button>
                  )}
                  <button className="btn_post" onClick={this.onPost}>
                    Post
                  </button>

                  <button className="btn_post" onClick={this.closeModule}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {filteredItems?.length !== 0 && (
            <div className="table_container">
              <div className={tableWrapStyle}>
                <table id="main-table">
                  <thead id="thed">
                    <tr className="heading-row" id="tr1">
                      <th className="s_no_head">
                        <input
                          type="checkbox"
                          className="bodyCheckBox"
                          checked={isCheckedAll}
                          onChange={this.toggleCheckboxAll}
                        />
                      </th>
                      <th className="t-head-cell wrap-text">Item Code</th>
                      {/* change width */}
                      <th className="t-head-cell wrap-text">Item Name</th>

                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalQtyReqProject")}
                      >
                        {"Total Requirment (Projects)"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() =>
                          this.handleSort("totalQtyReqSSalesOrder")
                        }
                      >
                        {"Total Requirment (Spare Sale Orders)"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalPOPlanningQty")}
                      >
                        {"PO Planning Qty"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("fReorderLevel")}
                      >
                        {"Reorder Qty"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalReqSOPO")}
                      >
                        {
                          "Total Requirment (Projects + Sale Orders + PO Planning Qty + Reorder Qty)"
                        }
                      </th>

                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("ppWhnetQty")}
                      >
                        {"Main Location Stock"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("spareWnetQty")}
                      >
                        {"Spares Location Stock (information only)"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalBoqPRBalance")}
                      >
                        {"BOQ PR"}
                      </th>

                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalBoqPOBalance")}
                      >
                        {"BOQ PO"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalGenPRBalance")}
                      >
                        {"Gen PR"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalGenPOBalance")}
                      >
                        {"Gen PO"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalAvailableStock")}
                      >
                        {"Total Available Stock"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalQtyConsumProject")}
                      >
                        {"Total Consumed (Projects)"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalQtyConsumSDC")}
                      >
                        {"Total Consumed (Spares Sale Orders)"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalIssueQty")}
                      >
                        {"Issue To Production"}
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("totalQtyConsumSOPO")}
                      >
                        {
                          "Total Consumed (Projects + Sale Orders + Issue to Prod)"
                        }
                      </th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("Quantity")}
                      >
                        {"Quantity to Order"}
                      </th>
                      <th
                        className="t-head-cell wrap-text"
                        // onClick={() => this.handleSort("model")}
                      >
                        {"Model"}
                      </th>
                      <th
                        className="t-head-cell"
                        // onClick={() => this.handleSort("make")}
                      >
                        {"Make"}
                      </th>
                      <th
                        className="t-head-cell"
                        // onClick={() => this.handleSort("size")}
                      >
                        {"Size"}
                      </th>
                      <th className="t-head-cell">Pref Supp-1</th>
                      <th className="t-head-cell">Pref Supp-2</th>
                      <th className="t-head-cell">Pref Supp-3</th>
                      <th
                        className="t-head-cell onclick-header"
                        onClick={() => this.handleSort("LeadTime")}
                      >
                        {"Lead Time (Days)"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="tableWrap">
                    {filteredItems.map((item, index) => (
                      <tr
                        key={`ext_${index}`}
                        className={`tr-tablerow ${
                          index % 2 === 0 ? "even-row" : "odd-row"
                        } ${item.selected ? "selected-row" : ""}`}
                      >
                        <td className="s_no">
                          <input
                            type="checkbox"
                            className="bodyCheckBox"
                            checked={item.selected}
                            onChange={() => this.toggleCheckbox(index)}
                            disabled={item.disabled ? true : false}
                          />
                        </td>
                        <td className="table-data wrap-text">
                          {item.itemCode}
                        </td>
                        <td className="table-data wrap-text">
                          {item.itemName}
                        </td>

                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalQtyReqProject}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalQtyReqSSalesOrder}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalPOPlanningQty}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.fReorderLevel}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalReqSOPO}
                        </td>

                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.ppWhnetQty}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.spareWnetQty}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalBoqPRBalance}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalBoqPOBalance}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalGenPRBalance}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalGenPOBalance}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalAvailableStock}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalQtyConsumProject}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalQtyConsumSDC}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalIssueQty}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.totalQtyConsumSOPO}
                        </td>

                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {
                            // if undefined or null or '' then 0 else calculate the value
                            item.Quantity === undefined ||
                            item.Quantity === null ||
                            item.Quantity === ""
                              ? 0
                              : item.Quantity
                          }
                        </td>
                        <td className="table-data wrap-text">
                          {item.ItemModelNo}
                        </td>
                        <td className="table-data">{item.Make}</td>
                        <td className="table-data">{item.Size}</td>

                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.iSupplier0}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.iSupplier1}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.iSupplier2}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.LeadTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {filteredItems?.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <p
                style={{
                  color: "#868e96",
                  fontSize: "16px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Data Found
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default SalesOrder;
