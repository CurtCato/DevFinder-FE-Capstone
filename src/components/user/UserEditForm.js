import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import "../dev/dev.css";
import APIManager from "../../APIManager/APIManager";
import { tsImportEqualsDeclaration } from "@babel/types";

export default class UserEditForm extends Component {
  // Set initial state
  state = {
    name: "",
    image: "",
    rates: "",
    email: "",
    password: "",
    githubLink: "",
    location: "",
    userLanguages: "",
    languages: [],
    id: parseInt(sessionStorage.getItem("userId"))
  };

  componentDidMount() {
    APIManager.get("users", this.props.match.params.userId).then(user => {
      this.setState({
        name: user.name,
        image: user.image,
        rates: user.rates,
        email: user.email,
        password: user.password,
        githubLink: user.githubLink,
        location: user.location,
        userLanguages: user.userLanguages,
        id: user.id
      });
    });
  }

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
      image: this.state.image,
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
    this.props.updateUser(user).then(() => this.props.history.push("/user"));
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

  render() {
    if (this.rateOptions.length === 0) {
      this.makeRateOptions();
    }
    console.log(this.languageOptions);
    return (
      <React.Fragment>
        <div className="editForm">
          <h1 className="heading">
            Hello {this.state.name}, this is where you edit your portfolio.
          </h1>
          {/* <form className="userEditForm"> */}
            <label className="form-group" htmlFor="inputName">
              Name
            </label>
            <input
              onChange={this.handleFieldChange}
              type="name"
              id="name"
              value={this.state.name}
              // placeholder={currentUser.name}
              required=""
              autoFocus=""
              className="form-control"
            />
            <br />
            <label className="form-group" htmlFor="inputImage">
              Update Your Picture
            </label>
            <input
              onChange={this.handleFieldChange}
              type="text"
              id="image"
              value={this.state.image}
              // placeholder={currentUser.image}
              className="form-control"
              autoFocus=""
            />
            <br />
            <label className="form-group" htmlFor="inputEmail">
              Email address
            </label>
            <input
              onChange={this.handleFieldChange}
              type="email"
              id="email"
              value={this.state.email}
              // placeholder={currentUser.email}
              required=""
              autoFocus=""
              className="form-control"
            />
            <br />
            <label className="form-group" htmlFor="languages">
              Select Known Languages
            </label>
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
            <br />
            <label className="form-group" htmlFor="githubLink">
              Github link
            </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="githubLink"
              value={this.state.githubLink}
              // placeholder={currentUser.githubLink}
            />
            <br />
            <label className="form-group" htmlFor="rate">
              Desired Hourly Rate
            </label>
            <Dropdown
              // placeholder={currentUser.rates}
              value={this.state.rates}
              fluid
              selection
              className="form-control"
              options={this.rateOptions}
              onChange={this.handleOptionSelected}
              id="rates"
            />
            <br />
            <label className="form-group" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="location"
              value={this.state.location}
              // placeholder={currentUser.location}
            />
            <br />
            <button
              // type="submit"
              onClick={() => {
                this.updateUser();
              }}
              className="btn btn-primary"
            >
              Submit
            </button>
          {/* </form> */}
        </div>
      </React.Fragment>
    );
  }
}
