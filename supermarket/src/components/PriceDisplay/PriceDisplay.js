import React from "react";
import "./PriceDisplay.css";

const SERVER = process.env.REACT_APP_SERVER_URL;

class PriceDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      listaDeProdutos: [],
      comprasAnteriores: [],
    };
  }

  componentDidMount() {
    fetch(`${SERVER}/productList`)
      .then((response) => response.json())
      .then((data) => this.setState({ listaDeProdutos: data }));
  }

  isMatch = (event) => {
    this.state.listaDeProdutos.forEach((value) => {
      if (value.produto === event.target.value) {
        fetch(`${SERVER}/previousPurchases`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: event.target.value }),
        })
          .then((response) => response.json())
          .then((prevPurch) => {
            this.setState({ comprasAnteriores: prevPurch }, () =>
              console.log(this.state.comprasAnteriores)
            );
          });
      }
    });
  };

  render() {
    return (
      // TABLE CONTAINING DATA FROM PAST PURCHASES
      <div>
        <div className="mb10">
          <label>Produto: </label>
          <input
            type="text"
            list="produtos"
            id="produto"
            onChange={this.isMatch}
          ></input>
          <datalist id="produtos">
            {this.state.listaDeProdutos.map((item) => (
              <option>{item.produto}</option>
            ))}
          </datalist>
        </div>

        <table>
          <tr>
            <th>Data</th>
            <th>Local</th>
            <th>Marca</th>
            <th>Preço/kg</th>
          </tr>
          {this.state.comprasAnteriores.length > 0 ? (
            this.state.comprasAnteriores.map((item, index) => (
              <tr key={index}>
                <td>{`${new Date(item.data).getDate()}/
                ${new Date(item.data).getMonth()}/
                ${new Date(item.data).getFullYear()}`}</td>
                <td>{item.local}</td>
                <td>{item.marca}</td>
                <td>{item.preco}</td>
              </tr>
            ))
          ) : (
            <tr key={0}>
              <td className="holder"></td>
              <td className="holder"></td>
              <td className="holder"></td>
              <td className="holder"></td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}

export default PriceDisplay;
