import React, { Component } from "react";

export default class UserCard extends Component {

  render() {
    return (
      <div className="card userCard w-25 bg-light">
        <div className="card-body userBody">
          <p className="card-title">Name: {this.props.user.name}</p>
          <p className="card">Languages Known: {this.props.user.languages}</p>
          <p className="card">Deployed Apps: {this.props.user.apps}</p>
          <p>Hourly Rate: {this.props.user.rates}</p>
          <p>Email Address: {this.props.user.email}</p>
          <p>Location: {this.props.user.location}</p>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
                console.log(this.props.user)
              this.props.history.push(`/user/${this.props.user.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => this.props.deleteUser(this.props.user.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}