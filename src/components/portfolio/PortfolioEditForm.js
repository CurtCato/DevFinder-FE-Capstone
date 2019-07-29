import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager"

export default class PortfolioEditForm extends Component {
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

  updateExistingPortfolio = evt => {
    evt.preventDefault();
      const editedPortfolio = {
        userId: parseInt(sessionStorage.getItem("userId")),
        name: this.state.name,
        languages: this.state.languages,
        rate: this.state.rate,
        apps: this.state.apps,
        email: this.state.email,
        location: this.state.location,
        id:this.props.match.params.portfolioId
      };

      this.props
        .updatePortfolio(editedPortfolio)
        .then(() => this.props.history.push("/portfolio"));
  };

  componentDidMount() {
    APIManager.get("portfolios", this.props.match.params.portfolioId).then(portfolio => {
      this.setState({
        userId: portfolio.userId,
        name: portfolio.name,
        languages: portfolio.languages,
        rate: portfolio.rate,
        apps: portfolio.apps,
        email: portfolio.email,
        location: portfolio.location,
        portfolioId: portfolio.id
      });
    });
  }

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
            onClick={this.updateExistingPortfolio}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}