import React, { Component } from "react";
import UserCard from "./UserCard";

export default class User extends Component {

  render() {
    return (
          <React.Fragment>
            <div className="row">
              {this.props.users
                .filter(
                  user =>
                    parseInt(user.id) ===
                    parseInt(sessionStorage.getItem("userId"))
                )
                .map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    {...this.props}
                    userLanguages={this.props.userLanguages}
                    showCurrentUserLanguages={this.props.showCurrentUserLanguages}
                  />
                ))}
            </div>
          </React.Fragment>
    );
  }
}
