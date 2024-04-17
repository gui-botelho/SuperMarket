import React from "react";

class PriceInput extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: "",
      marca: "",
      quantidade: 0,
      unidade: "",
      preço: 0,
      local: "",
      data: new Date(),
      listaDeProdutos: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/productList")
      .then((response) => response.json())
      .then((data) => this.setState({ listaDeProdutos: data }));
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
    const sendProduct = {
      produto: this.state.produto,
      marca: this.state.marca,
      quantidade: this.state.quantidade,
      unidade: this.state.unidade,
      preco: this.state.preço,
      local: this.state.local,
      data: this.state.data,
    };
    fetch("http://localhost:3000/insertProduct", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ insertProduct: sendProduct }),
    })
      .then((response) => response.json())
      .then((newProds) =>
        this.setState({ listaDeProdutos: newProds }, () =>
          console.log(newProds)
        )
      );
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <label>Produto: </label>
            <input
              type="text"
              list="produtos"
              id="produto"
              onChange={this.onInputChange}
            ></input>
            <datalist id="produtos">
              {this.state.listaDeProdutos.map((item) => (
                <option>{item.produto}</option>
              ))}
            </datalist>
          </div>
          <label>Marca: </label>
          <input type="text" id="marca" onChange={this.onInputChange}></input>
          <div>
            <div>
              <label>Quantidade: </label>
              <input
                type="text"
                id="quantidade"
                onChange={this.onInputChange}
              ></input>
            </div>
            <div>
              <label>Unidade: </label>
              <select id="unidade" onChange={this.onInputChange}>
                <option>g</option>
                <option>Kg</option>
                <option>mL</option>
                <option>L</option>
              </select>
            </div>
          </div>
          <div>
            <label>Preço: </label>
            <input type="text" id="preço" onChange={this.onInputChange}></input>
          </div>
          <div>
            <label>Local: </label>
            <select id="local" onChange={this.onInputChange}>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div>
            <label>Data: </label>
            <input type="date" id="data" onChange={this.onInputChange}></input>
          </div>
          <button onClick={this.onInsert}>Inserir dados</button>
        </div>
      </div>
    );
  }
}

export default PriceInput;
