import React, { Component } from "react";
import UserCard from "./UserCard";

export default class User extends Component {

  // showButton = () => {
  //   let check = false;
  //   this.props.users.forEach(user => {
  //     if (user.id === parseInt(sessionStorage.getItem("userId"))) {
  //       check = true
  //     }
  //   });
  //   return check;
  // };
  render() {
    return (
      // <React.Fragment>
      //   {this.showButton() ? (
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
      //   ) : "" }
      //   {(
      //       !this.showButton() ?
      //     <React.Fragment>
      //       <div className="createUserButton">
      //         <button
      //           type="button"
      //           className="btn btn-success"
      //           onClick={() => {
      //             this.props.history.push("/user/new");
      //           }}
      //         >
      //           Create Portfolio
      //         </button>
      //       </div>
      //     </React.Fragment> : ""
      //   )}
      // </React.Fragment>
    );
  }
}
