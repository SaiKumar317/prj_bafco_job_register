import React from "react";

function JobDetailsBasicInfo({ data }) {
  if (!data || data.length === 0) {
    return (
      <p style={{ fontWeight: "bold" }}>
        No Job details data found for the selected job.
      </p>
    );
  }
  return (
    <>
      <div className="job-header">
        <div className="filters-bar">
          <div className="filter-group">
            <label htmlFor="status">Status</label>
            <input
              className="input-field"
              id="status"
              type="text"
              readOnly
              value={data?.[0]?.jobStatus || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="operation">Operation</label>
            <input
              className="input-field"
              id="operation"
              type="text"
              readOnly
              value={data?.[0]?.operationType || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="service-type">Service Type</label>
            <input
              className="input-field"
              id="service-type"
              type="text"
              readOnly
              value={data?.[0]?.serviceType || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="job-id">Job Id</label>
            <input
              className="input-field"
              id="job-id"
              type="text"
              readOnly
              value={data?.[0]?.jobName || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="date">Date</label>
            <input
              className="input-field"
              id="date"
              type="text"
              readOnly
              value={data?.[0]?.docDate || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="so-number">SO #</label>
            <input
              className="input-field"
              id="so-number"
              type="text"
              readOnly
              value={data?.[0]?.serviceOrderId || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="branch">Branch</label>
            <input
              className="input-field"
              id="branch"
              type="text"
              readOnly
              value={data?.[0]?.branch || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="customer">Customer</label>
            <input
              className="input-field"
              id="customer"
              type="text"
              readOnly
              value={data?.[0]?.customerAcc || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="handle-by">Handle By</label>
            <input
              className="input-field"
              id="handle-by"
              type="text"
              readOnly
              value={data?.[0]?.handleBy || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="salesman">Salesman</label>
            <input
              className="input-field"
              id="salesman"
              type="text"
              readOnly
              value={data?.[0]?.salesman || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="division">Division</label>
            <input
              className="input-field"
              id="division"
              type="text"
              readOnly
              value={data?.[0]?.division || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="cost-center">Cost Center</label>
            <input
              className="input-field"
              id="cost-center"
              type="text"
              readOnly
              value={data?.[0]?.costCenter || ""}
            />
          </div>
        </div>
      </div>
      <div className="job-header">
        <div className="filters-bar">
          <div className="filter-group">
            <label htmlFor="customer-po-ref">Customer PO Ref</label>
            <input
              className="input-field"
              id="customer-po-ref"
              type="text"
              readOnly
              value={data?.[0]?.PORef || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="ship-ei">Ship(E)/Ship(I)</label>
            <input
              className="input-field"
              id="ship-ei"
              type="text"
              readOnly
              value={data?.[0]?.ShippingConsignmentCode || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="freight-term">Freight Term</label>
            <input
              className="input-field"
              id="freight-term"
              type="text"
              readOnly
              value={data?.[0]?.freightTerms || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="ship-line">Ship Line</label>
            <input
              className="input-field"
              id="ship-line"
              type="text"
              readOnly
              value={data?.[0]?.shippingLine || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="vessel">Vessel</label>
            <input
              className="input-field"
              id="vessel"
              type="text"
              readOnly
              value={data?.[0]?.vessel || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="voyage">Voyage</label>
            <input
              className="input-field"
              id="voyage"
              type="text"
              readOnly
              value={data?.[0]?.voyage || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="pol">POL</label>
            <input
              className="input-field"
              id="pol"
              type="text"
              readOnly
              value={data?.[0]?.portLoading || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="pod">POD</label>
            <input
              className="input-field"
              id="pod"
              type="text"
              readOnly
              value={data?.[0]?.portDestination || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="eta-date">ETA Date</label>
            <input
              className="input-field"
              id="eta-date"
              type="text"
              readOnly
              value={data?.[0]?.arrival || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="shipped-on-board">Shipped on Board</label>
            <input
              className="input-field"
              id="shipped-on-board"
              type="text"
              readOnly
              value={data?.[0]?.departure || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="final-destination">Final Destination</label>
            <input
              className="input-field"
              id="final-destination"
              type="text"
              readOnly
              value={data?.[0]?.finalDestination || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="booked-container">Booked Container</label>
            <input
              className="input-field"
              id="booked-container"
              type="text"
              readOnly
              value={data?.[0]?.bookedContainer || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="goods-type">Goods Type</label>
            <input
              className="input-field"
              id="goods-type"
              type="text"
              readOnly
              value={data?.[0]?.goodsType || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="dg-class">DG Class</label>
            <input
              className="input-field"
              id="dg-class"
              type="text"
              readOnly
              value={data?.[0]?.dgClass || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="commodity-type">Commodity Type</label>
            <input
              className="input-field"
              id="commodity-type"
              type="text"
              readOnly
              value={data?.[0]?.jobCommodity || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="cargo-pickup-place">Cargo Pickup Place</label>
            <input
              className="input-field"
              id="cargo-pickup-place"
              type="text"
              readOnly
              value={data?.[0]?.pickupPlace || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="drop-of-place">Drop of Place</label>
            <input
              className="input-field"
              id="drop-of-place"
              type="text"
              readOnly
              value={data?.[0]?.dropofPlace || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="mbl">MBL</label>
            <input
              className="input-field"
              id="mbl"
              type="text"
              readOnly
              value={data?.[0]?.MblNoHeader || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="hbl">HBL</label>
            <input
              className="input-field"
              id="hbl"
              type="text"
              readOnly
              value={data?.[0]?.HblNoHeader || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="weight-kgs">Weight (kgs)</label>
            <input
              className="input-field"
              id="weight-kgs"
              type="text"
              readOnly
              value={data?.[0]?.weightKgs || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="measurement-cbm">Measurement (CBM)</label>
            <input
              className="input-field"
              id="measurement-cbm"
              type="text"
              readOnly
              value={data?.[0]?.measurementCbm || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="awb">AWB</label>
            <input
              className="input-field"
              id="awb"
              type="text"
              readOnly
              value={data?.[0]?.cargoAwb || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="bayan">Bayan</label>
            <input
              className="input-field"
              id="bayan"
              type="text"
              readOnly
              value={data?.[0]?.bayanNo || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="customs-broker">Customs Broker</label>
            <input
              className="input-field"
              id="customs-broker"
              type="text"
              readOnly
              value={data?.[0]?.vendorCustId || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="booking-type">Booking Type</label>
            <input
              className="input-field"
              id="booking-type"
              type="text"
              readOnly
              value={data?.[0]?.bookinType || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="overseas-agent">Overseas Agent</label>
            <input
              className="input-field"
              id="overseas-agent"
              type="text"
              readOnly
              value={data?.[0]?.overseasAgent || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="network-type">Network Type</label>
            <input
              className="input-field"
              id="network-type"
              type="text"
              readOnly
              value={data?.[0]?.networkType || ""}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="notes">Notes</label>
            <input
              className="input-field"
              id="notes"
              type="text"
              readOnly
              value={data?.[0]?.notes || ""}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetailsBasicInfo;
