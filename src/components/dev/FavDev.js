import React, { Component } from "react";
import {Image} from "semantic-ui-react"
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
            <div className="devCardContainer">
              <div
                key={favDevObj.id}
                className="card devCard w-25 py-3 px-3 m-5 bg-light"
              >
                <div className="card-body devBody w-100">
                  <h1 className="card-title">
                    <Image src={favDevObj.user.image} size="medium" circular centered />
                  <span>{favDevObj.user.name}</span>
                  </h1>
                  <h3 className="card">
                    Languages Known:
                    {this.props.userLanguages
                      .filter(userLanguage => userLanguage.userId === favDevObj.user.id)
                      .map(userLanguage => {
                        return (
                          <div key={userLanguage.id}>
                            - {userLanguage.language.text}
                          </div>
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
                        this.props.deleteFavDev(favDevObj.id);
                      console.log(this.props.user);
                    }}
                  >
                    Remove This Dev
                  </button>
                </div>
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
