import React from "react";

class PriceDisplay extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      // TABLE CONTAINING DATA FROM PAST PURCHASES
      <div>
        <table>
          <tr>
            <th>Data</th>
            <th>Local</th>
            <th>Marca</th>
            <th>Preço/kg</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default PriceDisplay;
