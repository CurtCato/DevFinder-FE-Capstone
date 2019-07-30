import React, { Component } from "react";
// import DropdownExampleMultipleSelection from "./PortfolioDropDown";
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

const DropdownExampleMultipleSelection = () => (
  <Dropdown
    placeholder="Languages Known"
    fluid
    multiple
    selection
    options={options}
  />
);

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

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleOptionsSelected = (event, {value}) => {
    event.preventDefault();
      this.setState({languages:value})
    }


  buildPortfolio = () => {
    let portfolio = {
      userId: parseInt(sessionStorage.getItem("userId")),
      name: this.state.name,
      languages: this.state.languages.join(" "),
      apps: this.state.apps,
      rate: this.state.rate,
      email: this.state.email,
      location: this.state.location
    };
    this.props.constructNewPortfolio(portfolio)

}

//     this.props
//       .addPortfolio(portfolio)
//       .then(() => this.props.history.push("/portfolio"));
//   };

  //   result(params)

  render() {
    return (
      <React.Fragment>
        <form
          className="portfolioForm"
          onSubmit={this.handleOptionsSelected.bind(this)}
        >
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
          <div>
            <Dropdown
              placeholder="Languages Known"
              fluid multiple selection
              options={options}
            //   value={this.state.languages}
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
            onClick= {()=>{
                this.buildPortfolio()
                this.props.history.push("/portfolio")
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
