import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import APIManager from "../APIManager/APIManager";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import User from "./user/User";
import UserEditForm from "./user/UserEditForm";
import DevList from "./dev/DevList";
import DevCard from "./dev/DevCard";
import FavDev from "./dev/FavDev";

class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    users: [],
    languages: [],
    rates: [],
    githubLink: [],
    userLanguages: [],
    devCollections: [],
    user: {}
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAll("users")
      .then(users => (newState.users = users))
      .then(() => APIManager.getAll("languages"))
      .then(languages => (newState.languages = languages))
      .then(() => APIManager.getAll("rates"))
      .then(rates => (newState.rates = rates))
      .then(() => APIManager.getAllExpand("userLanguages", "user", "language"))
      .then(userLanguages => (newState.userLanguages = userLanguages))
      .then(() => APIManager.getDevsExpand("devCollections", "user"))
      .then(devCollections => (newState.devCollections = devCollections))
      .then(() => this.setState(newState))
  }

  addUser = user => {
    return APIManager.post(user, "users")
      .then(() => APIManager.getAll("users"))
      .then(users => this.setState({ users: users }));
  };

  updateUser = editedUserObject => {
    return APIManager.put(editedUserObject, "users")
      .then(() => APIManager.getAll("users"))
      .then(user => {
        this.setState({ users: user });
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

  deleteFavDev = id => {
    return APIManager.delete("devCollections", id)
    .then(() => APIManager.getDevsExpand("devCollections", "user"))
    .then (devCollections => {
      this.setState({ devCollections : devCollections })
    })
  }

  addDevOfInterest = obj => {
    const newState = {}
    return APIManager.post(obj, "devCollections")
    .then(() => APIManager.getDevsExpand("devCollections", "user"))
    .then(devCollections => (newState.devCollections = devCollections))
    .then(() => this.setState(newState))
    .then(console.log("new state", newState))
  };

  postUserLanguageObj = obj => {
    return APIManager.post(obj, "userLanguages")
      .then(() => APIManager.getAllExpand("userLanguages", "user", "language"))
      .then(languages => {
        console.log("languages", languages)
        return this.setState({ userLanguages: languages });
      });
  };

  showCurrentUserLanguages = () => {
    return this.state.userLanguages.filter(
      language => language.userId === parseInt(sessionStorage.getItem("userId"))
    );
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
            return (
              <Register
                {...props}
                addUser={this.addUser}
                postUserLanguageObj={this.postUserLanguageObj}
                rates={this.state.rates}
                languages={this.state.languages}
                userLanguages={this.state.userLanguages}
              />
            );
          }}
        />

        <Route
          exact
          path="/user"
          render={props => {
            if (this.isAuthenticated()) {
              console.log("route render", this.state.userLanguages);
              let currentUserLanguages = this.showCurrentUserLanguages()
              return (
                <User
                  {...props}
                  deleteUser={this.deleteUser}
                  users={this.state.users}
                  userLanguages={currentUserLanguages}
                  showCurrentUserLanguages={this.showCurrentUserLanguages}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          path="/user/:userId(\d+)/edit"
          render={props => {
            return (
              <UserEditForm
                {...props}
                rates={this.state.rates}
                userLanguages={this.state.userLanguages}
                languages={this.state.languages}
                updateUser={this.updateUser}
                makeLanguageOptions={this.makeUserLanguageOptions}
                postUserLanguageObj={this.postUserLanguageObj}
              />
            );
          }}
        />

        <Route
          path="/favDevs"
          render={props => {
            if (this.isAuthenticated()) {
              return (
               <FavDev
                  {...props}
                  user={this.state.users}
                  userLanguages={this.state.userLanguages}
                  devCollection={this.state.devCollections}
                  deleteFavDev={this.deleteFavDev}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          path="/devList"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <DevList
                  {...props}
                  addDevOfInterest={this.addDevOfInterest}
                  users={this.state.users}
                  languages={this.state.languages}
                  userLanguages={this.state.userLanguages}
                  devCollection={this.state.devCollections}
                />
              );
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
