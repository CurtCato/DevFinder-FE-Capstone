import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css";
import DevFinder from "./components/DevFinder";
import "semantic-ui-css/semantic.min.css"

ReactDOM.render(
  <Router>
    <DevFinder />
  </Router>,
  document.getElementById("root")
);
