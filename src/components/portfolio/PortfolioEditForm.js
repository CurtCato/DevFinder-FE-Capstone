import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager"
import { Dropdown } from "semantic-ui-react";

const options = [
  {
    key: "Python",
    text: "Python",
    value: "Python",
    id: 1
  },
  {
    key: "Django",
    text: "Django",
    value: "Django",
    id: 2
  },
  {
    key: "JSX",
    text: "JSX",
    value: "JSX",
    id: 3
  },
  {
    key: "C-Sharp",
    text: "C-Sharp",
    value: "C-Sharp",
    id: 4
  },
  {
    key: "Angular",
    text: "Angular",
    value: "Angular",
    id: 5
  }
];


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

  handleOptionsSelected = (event, {value}) => {
    event.preventDefault();
      this.setState({languages:value})
    }



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
              value={this.state.name}
            />
          </div>
          <div>
            <Dropdown
              placeholder="Languages Known"
              fluid multiple selection
              options={options}
              onChange={this.handleOptionsSelected}
              id="languages"
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
              value={this.state.apps}
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
              value={this.state.rate}
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
              value={this.state.email}
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