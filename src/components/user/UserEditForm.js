import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import APIManager from "../../APIManager/APIManager";

export default class UserEditForm extends Component {
  // Set initial state
  state = {
    name: "",
    rates: "",
    email: "",
    githubLink: "",
    location: "",
    // password: "",
    userLanguages: "",
    id: parseInt(sessionStorage.getItem("userId"))
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleOptionSelected = (event, { value }) => {
    event.preventDefault();
    this.setState({ rates: value });
  };

  updateUser = () => {
    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      rates: this.state.rates,
      githubLink: this.state.githubLink,
      location: this.state.location,
      id: this.state.id
    };
    this.state.languages.forEach(languageId => {
      let obj = {};
      obj.languageId = languageId;
      obj.userId = parseInt(sessionStorage.getItem("userId"));
      this.props.postUserLanguageObj(obj);
    });
    this.props.updateUser(user);
    this.props.history.push("/user");
    // .then(window.location.reload());
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
    return value;
  };

  languageOptions = this.props.languages.reduce((acc, language) => {
    const stuff = this.props.userLanguages.filter(
      userLanguage =>
        userLanguage.userId === parseInt(sessionStorage.getItem("userId")) &&
        userLanguage.languageId === language.id
    );

    if (stuff.length === 0) {
      const obj = {
        key: language.key,
        text: language.text,
        value: language.id,
        id: language.id
      };

      acc.push(obj);
    } else {
      return acc;
    }

    return acc;
  }, []);

  findUser = () => {
    let currentUser = "";
    this.props.users.forEach(user => {
      if (user.id === parseInt(sessionStorage.getItem("userId"))) {
        currentUser = user;
      }
    });
    return currentUser;
  };

  render() {
    // if (this.languageOptions.length === 0) {
    //   this.makeLanguageOptions();
    // }
    if (this.rateOptions.length === 0) {
      this.makeRateOptions();
    }
    let currentUser = this.findUser();
    console.log(this.languageOptions);
    return (
      <React.Fragment>
        <h1>
          Hello {currentUser.name}, this is where you edit your awesome profile.
        </h1>
        <form className="userEditForm card">
          <label className="form-group" htmlFor="inputName">
            Name:&nbsp;
          </label>
          <input
            onChange={this.handleFieldChange}
            type="name"
            id="name"
            placeholder={currentUser.name}
            required=""
            autoFocus=""
            className="form-control"
          />
          <br />
          <label className="form-group" htmlFor="inputEmail">
            Email address:&nbsp;
          </label>
          <input
            onChange={this.handleFieldChange}
            type="email"
            id="email"
            placeholder={currentUser.email}
            required=""
            autoFocus=""
            className="form-control"
          />
          <br />
          {/* <label className="form-group" htmlFor="inputPassword">
            Password:&nbsp;
          </label> */}
          {/* <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            required=""
            className="form-control"
          /> */}
          <div>
            <label htmlFor="languages">Select Known Languages</label>
            <Dropdown
              placeholder=""
              fluid
              multiple
              selection
              className="form-control"
              options={this.languageOptions}
              onChange={this.handleOptionsSelected}
              id="languages"
            />
          </div>
          <div className="form-group">
            <label htmlFor="apps">Github link</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="apps"
              placeholder="Apps"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rate">Desired Hourly Rate</label>
            <Dropdown
              placeholder={currentUser.rates}
              fluid
              selection
              className="form-control"
              options={this.rateOptions}
              onChange={this.handleOptionSelected}
              id="rates"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="location"
              placeholder={currentUser.location}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              this.updateUser();
            }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
