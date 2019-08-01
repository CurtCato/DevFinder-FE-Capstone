import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import APIManager from "../../APIManager/APIManager";

export default class UserForm extends Component {
  // Set initial state
  state = {
    name: "",
    rates: "",
    email: "",
    location: "",
    password: "",
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
    console.log(value);
  };

  updateUser = () => {
    let user = {
      rates: this.state.rates,
      location: this.state.location,
      id: this.state.id
    };
    this.props.updateUser(user);
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

  // handleOptionsSelected = (event, { value }) => {
  //   event.preventDefault();
  //   this.setState({ languages: value });
  //   console.log(value);
  // };

  // languageOptions = [];
  // makeLanguageOptions() {
  //   this.props.languages.map(language => {
  //     const languageOption = {
  //       key: language.key,
  //       text: language.text,
  //       value: language.value,
  //       id: language.id
  //     };
  //     this.languageOptions.push(languageOption);
  //   });
  // }

  findUser = () => {
    let currentUser = "";
    this.props.users.forEach(user => {
      if (user.id === parseInt(sessionStorage.getItem("userId"))) {
        currentUser = user;
      } else {
        currentUser = "no user found";
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
    console.log(currentUser);
    return (
      <React.Fragment>
        <h1>
          Hello {currentUser.name}, please input your desired rate and location.
        </h1>
        <form
          className="userForm"
          // onSubmit={this.handleOptionsSelected.bind(this)}
        >
          {/* <div>
            <Dropdown
              placeholder="Languages Known"
              fluid
              multiple
              selection
              options={this.languageOptions}
              onChange={this.handleOptionsSelected}
              id="languages"
            />
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="apps">Apps</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="apps"
              placeholder="Apps"
            />
          </div> */}
          <div className="form-group">
            <Dropdown
              placeholder="Hourly Rate Desired"
              fluid
              selection
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
              placeholder="Location"
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              this.updateUser();
              this.props.history.push("/user");
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
