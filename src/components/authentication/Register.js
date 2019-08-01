import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager";

export default class Register extends Component {
  state = {
    name: "",
    rates: "",
    email: "",
    password: "",
    location: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleRegister = event => {
    event.preventDefault();
    APIManager.getAll("users").then(users => {
      let isMatch = users.find(
        user => user.email.toLowerCase() === this.state.email.toLowerCase()
      );
      if (isMatch) {
        window.alert(
          "This email already exists! Please go back to login page."
        );
      } else if (
        this.state.name === "" ||
        this.state.email === "" ||
        this.state.password === ""
      ) {
        window.alert("You left a field blank!");
      } else {
        let newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          rates: this.state.rates,
          location: this.state.location,
          userId: this.state.userId
        };
        this.props.addUser(newUser).then(() =>
          APIManager.getAll("users")
            .then(users =>
              users.find(user => user.password === this.state.password)
            )
            .then(foundUser => sessionStorage.setItem("userId", foundUser.id))
            .then(() => this.props.history.push("/dashboard"))
        );
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>
        <label htmlFor="inputName">Name:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="name"
          id="name"
          placeholder="Name"
          required=""
          autoFocus=""
        />
        <br />
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
        <br />
        <button type="submit" className="btn btn-info btn-sm login-button">
          Register
        </button>
        <br />
        <button
          type="button"
          className="btn btn-link"
          onClick={() => this.props.history.push("/")}
        >
          Back to Login Page
        </button>
      </form>
    );
  }
}
