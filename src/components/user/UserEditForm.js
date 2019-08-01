import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager";
import { Dropdown } from "semantic-ui-react";

export default class UserEditForm extends Component {
  // Set initial state
  state = {
    // userId: "",
    name: "",
    languages: "",
    apps: "",
    rates: "",
    email: "",
    location: "",
    id: parseInt(sessionStorage.getItem("userId"))
  };

  // Update state whenever an input field is edited
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

  updateExistingUser = evt => {
    evt.preventDefault();
    const editedUser = {
      // name: this.state.name,
      // languages: this.state.languages,
      rates: this.state.rates,
      // apps: this.state.apps,
      // email: this.state.email,
      location: this.state.location,
      id: this.state.id
    };

    this.props
      .updateUser(editedUser)
      .then(() => this.props.history.push("/user"));
  };

  componentDidMount() {
    APIManager.get("users", this.props.match.params.userId).then(
      user => {
        this.setState({
          userId: user.userId,
          name: user.name,
          languages: user.languages,
          rates: user.rates,
          apps: user.apps,
          email: user.email,
          location: user.location,
          userId: user.id
        });
      }
    );
  }

  // handleOptionsSelected = (event, { value }) => {
    //   event.preventDefault();
    //   this.setState({ languages: value });
    // };

  // languagesOptions = [];
  // makeLanguagesOptions = languages => {
  //   this.props.languages.map(language => {
  //     const languagesOption = {
  //       key: language.key,
  //       text: language.text,
  //       value: language.value,
  //       id: language.id
  //     };
  //     this.languagesOptions.push(languagesOption);
  //   });
  // };

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

  render() {
    // if (this.languagesOptions.length === 0) {
    //   this.makeLanguagesOptions();
    // }
    if (this.rateOptions.length === 0){
        this.makeRateOptions()
    }
    return (
      <React.Fragment>
        <form className="userForm">
          {/* <div>
            <Dropdown
              placeholder="Languages Known"
              fluid
              multiple
              selection
              options={this.languagesOptions}
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
              value={this.state.apps}
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
            onClick={this.updateExistingUser}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
