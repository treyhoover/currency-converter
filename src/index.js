import React from "react";
import ReactDOM from "react-dom";
import Converter from "./components/Converter";
import "./index.css";

const App = props => {
  return (
    <div>
      <h1>Currency Converter</h1>
      <Converter />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
