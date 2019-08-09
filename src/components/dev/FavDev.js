import React, { Component } from "react";
import DevCard from "./DevCard";
import "./dev.css";

export default class FavDev extends Component {
  render() {
    // this.props.devCollection.forEach(favDevObj => {
    //   if (favDevObj.currentUserId === parseInt(sessionStorage.getItem("userId")))
    return (
      <React.Fragment>
        {this.props.devCollection.map(favDevObj => {
          return favDevObj.currentUserId ===
            parseInt(sessionStorage.getItem("userId")) ? (
            <div
              key={favDevObj.id}
              className="card devCard w-25 py-3 px-3 m-5 bg-light"
            >
              <div className="card-body devBody w-100">
                <h1 className="card-title">Name: {favDevObj.user.name}</h1>
                <h3 className="card">
                  Languages Known:
                  {this.props.languages
                    .filter(language => language.userId === favDevObj.user.id)
                    .map(language => {
                      return (
                        <div key={language.id}>- {language.language.text}</div>
                      );
                    })}
                </h3>
                <h3>GitHub Link: {favDevObj.user.githubLink}</h3>
                <h3>Hourly Rate: {favDevObj.user.rates}</h3>
                <h3>Email Address: {favDevObj.user.email}</h3>
                <h3>Location: {favDevObj.user.location}</h3>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you wish to remove this dev from your favorites?"
                      )
                    )
                      this.props
                        .deleteFavDev(favDevObj.id)
                    console.log(this.props.user);
                  }}
                >
                  Remove This Dev
                </button>
              </div>
            </div>
          ) : (
            ""
          );
        })}
      </React.Fragment>
    );
  }
}
