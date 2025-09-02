import React from "react";

function CostEntry() {
  return (
    <div>
      <div className="filters-bar">
        <select>
          <option>Choose a Vendor</option>
        </select>
        <input type="text" placeholder="Invoice No" />
        <input type="date" placeholder="INV Date" />
        <input type="text" placeholder="0 Tax Cost" />
        <input type="text" placeholder="Tax Cost" />
        <input type="text" placeholder="Tax Amount" />
        <input type="text" placeholder="Narration English" />
        <input type="text" placeholder="Narration Arabic" />

        <button className="btn btn-blue">Add New Cost</button>
        <button className="btn btn-green">Save Cost</button>
        <button className="btn btn-light">Cancel</button>
      </div>

      <table className="job-table">
        <thead>
          <tr>
            <th>Move?</th>
            <th>Vendor Id</th>
            <th>INV #</th>
            <th>INV Date</th>
            <th>0 Tax DB</th>
            <th>Tax DB</th>
            <th>Credit</th>
            <th>0 Tax Cost</th>
            <th>Tax Cost</th>
            <th>Tax Amount</th>
            <th>Total Cost</th>
            <th>EIR Id</th>
            <th>Challan</th>
            <th>Cntr #</th>
            <th>CHK</th>
            <th>Narration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <span className="edit-link">Edit</span> GEN-TPT
            </td>
            <td>150725-235</td>
            <td>15/07/2025</td>
            <td>511003</td>
            <td>512002</td>
            <td>H.O</td>
            <td>65.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>65.00</td>
            <td>150725-235</td>
            <td>0</td>
            <td>CAAU215545</td>
            <td>N</td>
            <td>EMPTY PICK UP FROM LINE - JED</td>
            <td>
              <span className="delete-icon">✖</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CostEntry;
