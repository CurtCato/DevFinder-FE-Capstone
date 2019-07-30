import React, { Component } from "react";
import { withRouter } from "react-router";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./DevFinder.css";

class DevFinder extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default withRouter(DevFinder);
