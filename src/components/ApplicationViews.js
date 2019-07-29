import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/dashboard" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/portfolio" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/devList" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
