import React, { Component } from "react";

class CostEntryTable extends Component {
  render() {
    return (
      <table className="styled-table">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Invoice No</th>
            <th>Amount</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ABC Logistics</td>
            <td>INV-1001</td>
            <td>1200</td>
            <td>USD</td>
          </tr>
          <tr>
            <td>XYZ Shipping</td>
            <td>INV-1002</td>
            <td>800</td>
            <td>EUR</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default CostEntryTable;
