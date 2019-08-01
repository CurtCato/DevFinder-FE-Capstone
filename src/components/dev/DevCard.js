import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager";

export default class DevCard extends Component {

    state = {
        currentUserId: "",
        faveDevId: "",
        id: ""
      };

saveDev = evt => {
    evt.preventDefault()
    const favDev = {
        currentUserId: parseInt(sessionStorage.getItem("userId")),
        faveDevId: this.state.faveDevId,
    }
}

addDevOfInterest = (obj) => {
    APIManager.post(obj, "devCollection")
}

  render() {
    return (
      <div className="card devCard w-25 bg-light">
        <div className="card-body devBody w-100">
          <p className="card-title">Name: {this.props.user.name}</p>
          <p className="card">Languages Known: {this.props.user.languages}</p>
          <p className="card">Deployed Apps: {this.props.user.apps}</p>
          <p>Hourly Rate: {this.props.user.rates}</p>
          <p>Email Address: {this.props.user.email}</p>
          <p>Location: {this.props.user.location}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ event => {
                console.log(this.props.user)
                // this.addDevOfInterest()
                console.log(event.target)
                console.log(this.props.match.params)
                console.log(this.isOfInterest)
            }}
          >
            Save Dev
          </button>
        </div>
      </div>
    );
  }
}