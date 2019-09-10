import React from "react";
import ReactDOM from "react-dom";
import Converter from "./Converter";
import "./index.css";

const App = props => {
  return (
    <div>
      <Converter />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
