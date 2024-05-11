import React from "react";
import PriceInput from "../PriceInput/PriceInput";
import PriceDisplay from "../PriceDisplay/PriceDisplay";
import "./Home.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = { route: "inserir" };
  }

  onClickButton = (event) => {
    this.setState({ route: event.target.id });
  };

  render() {
    return (
      <div className="home-overall">
        <div className="buttons">
          <button id="inserir" onClick={this.onClickButton}>
            Inserir
          </button>
          <button id="consultar" onClick={this.onClickButton}>
            Consultar
          </button>
        </div>
        {this.state.route === "inserir" ? <PriceInput /> : <PriceDisplay />}
      </div>
    );
  }
}

export default Home;
