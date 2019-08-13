import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager";
import { Image, Reveal } from "semantic-ui-react";

export default class DevCard extends Component {
  state = {
    currentUserId: "",
    userId: "",
    id: ""
  };

  saveDev = () => {
    const favDev = {
      currentUserId: parseInt(sessionStorage.getItem("userId")),
      userId: this.props.user.id
    };
    this.addDevOfInterest(favDev);
  };

  addDevOfInterest = obj => {
    APIManager.post(obj, "devCollections");
  };

  render() {
    return (
      <div className="card devCard w-25 py-3 px-3 m-5 bg-light">
        <div className="card-body devBody w-100">
          <h1 className="card-title">
            <Reveal animated="rotate left">
              <Reveal.Content visible>
                <Image
                  circular
                  size="medium"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReI-t7NmQG_EuhsZlrpttC0vPnxnJU2etHtzS7shJ_Je699yHG"
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Image
                  src={this.props.user.image}
                  size="medium"
                  circular
                  centered
                />
              </Reveal.Content>
            </Reveal>
            <span>{this.props.user.name}</span>
          </h1>
          <h3 className="card">
            Languages Known:
            {this.props.userLanguages
              .filter(
                userLanguage => userLanguage.userId === this.props.user.id
              )
              .map(userLanguage => {
                return (
                  <div key={userLanguage.id}>
                    - {userLanguage.language.text}
                  </div>
                );
              })}
          </h3>
          <h3>GitHub Link: {this.props.user.githubLink}</h3>
          <h3>Hourly Rate: {this.props.user.rates}</h3>
          <h3>Email Address: {this.props.user.email}</h3>
          <h3>Location: {this.props.user.location}</h3>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              this.saveDev();
              console.log(this.props.user);
              // console.log(this.props.match.params);
            }}
          >
            Save Dev
          </button>
        </div>
      </div>
    );
  }
}
