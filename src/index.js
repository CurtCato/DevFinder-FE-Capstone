import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css";
import DevFinder from "./components/DevFinder";

ReactDOM.render(
  <Router>
    <DevFinder />
  </Router>,
  document.getElementById("root")
);
