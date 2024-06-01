import React from "react";
import "./PriceInput.css";

const SERVER = process.env.REACT_APP_SERVER_URL;

function formatDate(date) {
  let year = "" + date.getFullYear();
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const defaultState = {
  produto: "",
  marca: "",
  quantidade: "",
  unidade: "",
  preço: "",
  local: "",
  data: formatDate(new Date()),
  listaDeProdutos: [],
  listaDeLocais: [],
};

class PriceInput extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  componentDidMount() {
    fetch(`${SERVER}/productList`)
      .then((response) => response.json())
      .then((data) => this.setState({ listaDeProdutos: data }));
    fetch(`${SERVER}/localList`)
      .then((response) => response.json())
      .then((data) => this.setState({ listaDeLocais: data }));
  }

  onInputChange = (event) => {
    switch (event.target.id) {
      case "produto":
        this.setState({ produto: event.target.value }, () =>
          console.log(this.state)
        );
        break;
      case "marca":
        this.setState({ marca: event.target.value }, () =>
          console.log(this.state)
        );
        break;
      case "quantidade":
        this.setState({ quantidade: event.target.value }, () =>
          console.log(this.state)
        );
        break;
      case "unidade":
        this.setState({ unidade: event.target.value }, () =>
          console.log(this.state)
        );
        break;
      case "preço":
        this.setState({ preço: event.target.value }, () =>
          console.log(this.state)
        );
        break;
      case "local":
        this.setState({ local: event.target.value }, () =>
          console.log(this.state)
        );
        break;
      case "data":
        this.setState({ data: event.target.value }, () =>
          console.log(this.state)
        );
        break;
      default:
        return;
    }
  };
  onInsert = () => {
    var pricePer = 0;
    if (
      this.state.unidade === "g" ||
      this.state.unidade === "mL" ||
      this.state.unidade === ""
    ) {
      pricePer = (this.state.preço / this.state.quantidade) * 1000;
    } else {
      pricePer = this.state.preço / this.state.quantidade;
    }

    const sendProduct = {
      produto: this.state.produto,
      marca: this.state.marca,
      quantidade: this.state.quantidade,
      unidade: this.state.unidade,
      preco: Number(pricePer.toFixed(2)),
      local: this.state.local,
      data: this.state.data,
    };

    fetch(`${SERVER}/insertProduct`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ insertProduct: sendProduct }),
    })
      .then((response) => response.json())
      .then((newProds) => {
        let newState = { ...defaultState };
        newState.listaDeProdutos = newProds;
        this.setState(newState);
      });
  };

  render() {
    return (
      <div className="overall">
        <div className="data-display">
          <label className="lbl">Produto: </label>
          <input
            type="text"
            list="produtos"
            id="produto"
            placeholder="Não informado"
            value={this.state.produto}
            onChange={this.onInputChange}
          ></input>
          <datalist id="produtos">
            {this.state.listaDeProdutos.map((item) => (
              <option>{item.produto}</option>
            ))}
          </datalist>
        </div>
        <div className="data-display">
          <label className="lbl">Marca: </label>
          <input
            type="text"
            id="marca"
            placeholder="Não informado"
            value={this.state.marca}
            onChange={this.onInputChange}
          ></input>
        </div>
        <div className="qtd">
          <div className="data-display half right">
            <label className="lbl quantidade">Quantidade: </label>
            <input
              className="input-quantidade"
              type="text"
              id="quantidade"
              placeholder="0"
              value={this.state.quantidade}
              onChange={this.onInputChange}
            ></input>
          </div>
          <div className="data-display half left">
            <select id="unidade" onChange={this.onInputChange}>
              <option>g</option>
              <option>Kg</option>
              <option>mL</option>
              <option>L</option>
            </select>
          </div>
        </div>
        <div className="data-display">
          <label className="lbl">Preço: </label>
          <input
            type="text"
            id="preço"
            placeholder="0"
            value={this.state.preço}
            onChange={this.onInputChange}
          ></input>
        </div>
        <div className="data-display">
          <label className="lbl">Local: </label>
          <input
            type="text"
            id="local"
            list="locais"
            placeholder="Não informado"
            value={this.state.local}
            onChange={this.onInputChange}
          ></input>
          <datalist id="locais">
            {this.state.listaDeLocais.map((item) => (
              <option>{item.local}</option>
            ))}
          </datalist>
        </div>
        <div className="data-display">
          <label className="lbl">Data: </label>
          <input
            type="date"
            id="data"
            value={this.state.data}
            onChange={this.onInputChange}
          ></input>
        </div>
        <button onClick={this.onInsert}>Inserir dados</button>
      </div>
    );
  }
}

export default PriceInput;
