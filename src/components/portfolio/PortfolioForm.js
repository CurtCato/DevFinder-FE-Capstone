import React, { Component } from "react";

export default class PortfolioForm extends Component {
  // Set initial state
  state = {
    userId: "",
    name: "",
    languages: "",
    apps: "",
    rate: "",
    email: "",
    location: "",
    id: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewPortfolio = evt => {
    evt.preventDefault();
      const portfolio = {
        userId: parseInt(sessionStorage.getItem("userId")),
        name: this.state.name,
        languages: this.state.languages,
        apps: this.state.apps,
        rate: this.state.rate,
        email: this.state.email,
        location: this.state.location
      };

      // Create the event and redirect user to event list
      this.props
        .addPortfolio(portfolio)
        .then(() => this.props.history.push("/portfolio"));
  };

  render() {
    return (
      <React.Fragment>
        <form className="portfolioForm">
          <div className="form-group">
            <label htmlFor="portfolioName">Your Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="name"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="languages">Languages</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="languages"
              placeholder="Languages"
            />
          </div>
          <div className="form-group">
            <label htmlFor="apps">Apps</label>
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
            <label htmlFor="rate">Rate</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="rate"
              placeholder="Rate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="email"
              placeholder="Email"
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
            onClick={this.constructNewPortfolio}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}