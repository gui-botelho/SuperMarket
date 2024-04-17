import logo from "./logo.svg";
import "./App.css";
import PriceInput from "./components/PriceInput/PriceInput";
import PriceDisplay from "./components/PriceDisplay/PriceDisplay";
function App() {
  return (
    <div className="App">
      <PriceInput></PriceInput>
      <div>
        =====================================//================================
      </div>
      <PriceDisplay />
    </div>
  );
}

export default App;
