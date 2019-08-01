import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import APIManager from "../APIManager/APIManager";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import User from "./user/User";
import UserForm from "./user/UserForm";
import DevList from "./dev/DevList";

class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    users: [],
    languages: [],
    rates: [],
    user: {}
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAll("users")
      .then(users => (newState.users = users))
      APIManager.getAll("languages")
      .then(languages => (newState.languages = languages))
      APIManager.getAll("rates")
      .then(rates => (newState.rates = rates))
      .then(() => this.setState(newState));
  }

  addUser = user => {
    return APIManager.post(user, "users")
      .then(() => APIManager.getAll("users"))
      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  updateUser = editedUserObject => {
    return APIManager.patch(editedUserObject, "users")
      .then(() => APIManager.getAll("users"))
      .then(user => {
        this.setState({
          users: user
        });
      });
  };

  deleteUser = id => {
    console.log(id);
    return APIManager.delete("users", id)
      .then(() => APIManager.getAll("users"))
      .then(user => {
        this.setState({ users: user });
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
          path="/user"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <User
                  {...props}
                  deleteUser={this.deleteUser}
                  users={this.state.users}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        {/* <Route
          exact
          path="/user/new"
          render={props => {
            return (
              <UserForm
                {...props}
                rates={this.state.rates}
                languages={this.state.languages}
                user={this.state.user}
                users={this.state.users}
                constructNewUser={this.constructNewUser}
              />
            );
          }}
        /> */}

        <Route
          path="/user/:userId(\d+)/edit"
          render={props => {
            console.log(this.state.user)
            return (
              <UserForm
                {...props}
                rates={this.state.rates}
                languages={this.state.languages}
                // user={this.state.user}
                users={this.state.users}
                updateUser={this.updateUser}
                // constructNewUser={this.constructNewUser}
              />
            );
          }}
        />

        <Route
          path="/devList"
          render={props => {
            if (this.isAuthenticated()) {
              return <DevList {...props} users={this.state.users} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
