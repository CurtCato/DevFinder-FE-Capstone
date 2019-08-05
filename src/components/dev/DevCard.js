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
      <div className="card devCard w-25 py-3 px-3 m-5 bg-light">
        <div className="card-body devBody w-100">
          <h1 className="card-title">Name: {this.props.user.name}</h1>
    <h3 className="card">Languages Known: {console.log(this.props.languages)}{this.props.languages.filter(language => language.userId === this.props.user.id).map(language => {
        console.log("language", language)
        return <div key={language.id}>{language.language.text}</div>})}</h3>
          <h3 className="card">Deployed Apps: {this.props.user.apps}</h3>
          <h3>Hourly Rate: {this.props.user.rates}</h3>
          <h3>Email Address: {this.props.user.email}</h3>
          <h3>Location: {this.props.user.location}</h3>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ event => {
                console.log(this.props.user)
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