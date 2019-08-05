import React, { Component } from "react";

export default class UserCard extends Component {

  currentUserLanguages = this.props.showCurrentUserLanguages(this.props.userLanguages)

  render() {
    console.log("current user langauges array", this.currentUserLanguages)
    return (
      <div className="card userCard w-50 h-75 py-4 m-5 px-4 bg-light">
        <div className="card-body userBody">
          <h1 className="card-title">Name: {this.props.user.name}</h1>
          <h3 className="languagesKnown">Languages Known: {this.currentUserLanguages.map(language => <div key={language.id}>{language.language.text}</div>)} </h3>
          <h3 className="deployedApps">Deployed Apps: {this.props.user.apps}</h3>
          <h3 className="hourlyRate">Hourly Rate: {this.props.user.rates}</h3>
          <h3 className="emailAddress">Email Address: {this.props.user.email}</h3>
          <h3 className="location">Location: {this.props.user.location}</h3>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push(`/user/${this.props.user.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() =>
              {if (window.confirm('Are you sure you wish to delete your account?')) this.props.deleteUser(this.props.user.id)
                .then(this.props.history.push("/"))
                .then(sessionStorage.clear())
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
