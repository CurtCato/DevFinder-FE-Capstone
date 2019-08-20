import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager";
import { Image, Reveal, Grid, Header } from "semantic-ui-react";
import "./dev.css";

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
    this.props.addDevOfInterest(favDev);
  };

  render() {
    return (
      <React.Fragment>
        <style>
          {`
      card {
        background-color: #252839 !important;
      }
      h3 {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      h3 > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}
        </style>
        <div className="card devCard w-25 py-3 px-3 m-5">
          <div className="card-body devBody w-100">
            <Reveal animated="move up">
              <Reveal.Content visible>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWUuOGwktOwrSbBCdf_v8LUpu5QgJX9OMbposSz-c7T-KCuXsXnw"
                  size="large"
                  // circular
                  centered
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Image
                  src={this.props.user.image}
                  size="large"
                  // circular
                  centered
                />
              </Reveal.Content>
            </Reveal>
            <Header as="h1" inverted textAlign="center">
              {this.props.user.name}
            </Header>
            <h3 className="languagesKnown">
              <u>Languages Known:</u>
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
            <Grid celled="internally" columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <h3><i>GitHub Link:</i> <a href="#">{this.props.user.githubLink}</a></h3>
                </Grid.Column>
                <Grid.Column>
                  <h3><i>Hourly Rate:</i> {this.props.user.rates}</h3>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <h3><i>Email Address:</i> <a href="#">{this.props.user.email}</a></h3>
                </Grid.Column>
                <Grid.Column>
                  <h3><i>Location:</i> {this.props.user.location}</h3>
                </Grid.Column>
              </Grid.Row>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.saveDev();
                  // window.location.reload()
                  console.log(this.props.user);
                }}
              >
                Save Dev
              </button>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
