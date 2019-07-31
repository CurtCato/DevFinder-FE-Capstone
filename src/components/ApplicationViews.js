import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import APIManager from "../APIManager/APIManager";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Portfolio from "./portfolio/Portfolio";
import PortfolioForm from "./portfolio/PortfolioForm";
import PortfolioEditForm from "./portfolio/PortfolioEditForm";
import PortfolioCard from "./portfolio/PortfolioCard"
import DevList from "./dev/DevList"

class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    portfolios: [],
    users: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAll("users")
      .then(users => (newState.users = users));
    APIManager.getAll("portfolios")
    .then(portfolios => (newState.portfolios = portfolios))
    .then(() => this.setState(newState));
  }

  constructNewPortfolio = obj => {
    APIManager.post(obj, "portfolios")
      .then(()=>APIManager.getAll("portfolios"))
      .then((portfolio) => {
        this.setState({portfolios: portfolio})
      })
  };

  addUser = user => {
    return APIManager.post(user, "users")
      .then(() => APIManager.getAll("users"))
      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  addPortfolio = portfolio =>
    APIManager.post(portfolio, "portfolios")
      .then(() => APIManager.getAll("portfolios"))
      .then(portfolios =>
        this.setState({
          portfolios: portfolios
        })
      );

  updatePortfolio = editedPortfolioObject => {
    return APIManager.put(editedPortfolioObject, "portfolios")
      .then(() => APIManager.getAll("portfolios"))
      .then(portfolios => {
        this.setState({
          portfolios: portfolios
        });
      });
  };

  deletePortfolio = id => {
    console.log(id);
    return APIManager.delete("portfolios", id)
      .then(() => APIManager.getAll("portfolios"))
      .then(portfolio => {
        this.setState({ portfolios: portfolio });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Login {...props} />;
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} addUser={this.addUser} />;
          }}
        />

        <Route
          path="/dashboard"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/portfolio"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Portfolio
                  {...props}
                  deletePortfolio={this.deletePortfolio}
                  portfolios={this.state.portfolios}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/portfolio/new"
          render={props => {
            return (
              <PortfolioForm
                {...props}
                addPortfolio={this.addPortfolio}
                portfolio={this.state.portfolio}
                constructNewPortfolio={this.constructNewPortfolio}
              />
            );
          }}
        />

        <Route
          path="/portfolio/:portfolioId(\d+)/edit"
          render={props => {
            return (
              <PortfolioEditForm
                {...props}
                portfolio={this.state.portfolio}
                updatePortfolio={this.updatePortfolio}
              />
            );
          }}
        />

        <Route
          path="/devList"
          render={props => {
            if (this.isAuthenticated()) {
              return (
              <DevList
              {...props}
              portfolios={this.state.portfolios}
              />
              )
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews)