import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager";
import { Dropdown } from "semantic-ui-react";


export default class Register extends Component {
  state = {
    name: "",
    image: "",
    rates: "",
    email: "",
    githubLink: "",
    password: "",
    location: "",
    userLanguages: ""
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
        this.state.password === "" ||
        this.state.rates === "" ||
        this.state.location === ""
        // this.state.userLanguages === ""
      ) {
        window.alert("You left a field blank!");
      } else {
        let newUser = {
          name: this.state.name,
          image: this.state.image,
          email: this.state.email,
          password: this.state.password,
          rates: this.state.rates,
          githubLink: this.state.githubLink,
          location: this.state.location,
          userId: this.state.userId
        };
        this.props.addUser(newUser).then(() =>
          APIManager.getAll("users")
            .then(users =>
              users.find(user => user.password === this.state.password)
            )
            .then(foundUser => sessionStorage.setItem("userId", foundUser.id))
            .then(() => {
              let promiseArr = []
              this.state.languages.forEach(language => {
                let userLanguage = {};
                userLanguage.languageId = language;
                userLanguage.userId = parseInt(
                  sessionStorage.getItem("userId")
                );
                 promiseArr.push(this.props.postUserLanguageObj(userLanguage));
              });
              return Promise.all(promiseArr)
            })
            .then(() => this.props.history.push("/user"))
        );
      }
    });
  };

  handleOptionSelected = (event, { value }) => {
    event.preventDefault();
    this.setState({ rates: value });
  };

  rateOptions = [];
  makeRateOptions() {
    this.props.rates.map(rate => {
      const rateOption = {
        id: rate.id,
        value: rate.rate,
        key: rate.key,
        text: rate.text
      };
      this.rateOptions.push(rateOption);
    });
  }

  handleOptionsSelected = (event, { value }) => {
    event.preventDefault();
    this.setState({ languages: value });
  };

  languageOptions = [];
  makeLanguageOptions() {
    this.props.languages.map(language => {
      const languageOption = {
        key: language.key,
        text: language.text,
        value: language.id,
        id: language.id
      };
      this.languageOptions.push(languageOption);
    });
  }

  render() {
    if (this.languageOptions.length === 0) {
      this.makeLanguageOptions();
    }
    if (this.rateOptions.length === 0) {
      this.makeRateOptions();
    }
    return (
      <form onSubmit={this.handleRegister}>
        <h1 className="heading">
          Please Create Your User Portfolio
        </h1>
        <label className="form-group" htmlFor="inputName">Name:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="name"
          id="name"
          placeholder="Name"
          className="form-control"
          required=""
          autoFocus=""
        />
        <br />
        <label className="form-group" htmlFor="inputImage">Link to Your Picture:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="text"
          id="image"
          placeholder="Image"
          className="form-control"
          autoFocus=""
        />
        <br />
        <label className="form-group" htmlFor="inputEmail">Email address:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="email"
          id="email"
          placeholder="Email address"
          className="form-control"
          required=""
          autoFocus=""
        />
        <br />
        <label className="form-group" htmlFor="inputPassword">Password:&nbsp;</label>
        <input
          onChange={this.handleFieldChange}
          type="password"
          id="password"
          placeholder="Password"
          className="form-control"
          required=""
        />
        <br />
        <div>
          <label className="form-group" htmlFor="languages">Select Known Languages:&nbsp;</label>
          <Dropdown
            placeholder="Languages Known"
            fluid
            multiple
            selection
            options={this.languageOptions}
            onChange={this.handleOptionsSelected}
            id="languages"
          />
          <br />
        </div>
        <br />
          <label className="form-group" htmlFor="github">Github link</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="GitHub Link"
            onChange={this.handleFieldChange}
            id="githubLink"
          />
        <br />
          <label className="form-group" htmlFor="rate">Desired Hourly Rate&nbsp;</label>
          <Dropdown
            placeholder="Hourly Rate Desired"
            fluid
            selection
            options={this.rateOptions}
            onChange={this.handleOptionSelected}
            id="rates"
          />
          <br />
          <label className="form-group" htmlFor="location">Location&nbsp;</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="location"
            placeholder="Location"
          />
        <br />
        <button type="submit" className="btn btn-info btn-sm login-button">
          Register
        </button>
        <br />
        <button
          type="button"
          className="btn btn-link"
          onClick={
            () => this.props.history.push("/")
          }
        >
          Back to Login Page
        </button>
      </form>
    );
  }
}
