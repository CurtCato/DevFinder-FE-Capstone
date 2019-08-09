import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleLogin = evt => {
    evt.preventDefault();
    APIManager.getAll("users").then(users => {
      const singleUser = users.find(
        element =>
          element.email.toLowerCase() === this.state.email.toLowerCase() &&
          element.password.toLowerCase() === this.state.password.toLowerCase()
      );
      if (singleUser) {
        sessionStorage.setItem("userId", singleUser.id);
        this.props.history.push("/user");
      } else {
        window.alert(
          "Invalid login information. Please try again, or register a new account."
        );
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
        <label htmlFor="inputEmail">Email address:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="email"
          id="email"
          placeholder="Email address"
          required=""
          autoFocus=""
        />
        <br />
        <label htmlFor="inputPassword">Password:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="password"
          id="password"
          placeholder="Password"
          required=""
        />
        &nbsp;
        <button type="submit" className="btn btn-info btn-sm login-button">
          Sign in
        </button>
        <br />
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.history.push("/register")}
        >
          Register New Account
        </button>
      </form>
    );
  }
}
