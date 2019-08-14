import React, { Component } from "react";
import { Image, Header, Divider, Grid } from "semantic-ui-react";
import "./dev.css";

export default class FavDev extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="devCardContainer">
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
          {this.props.devCollection.map(favDevObj => {
            return favDevObj.currentUserId ===
              parseInt(sessionStorage.getItem("userId")) ? (
              // <div className="devCardContainer">
              <div
                key={favDevObj.id}
                className="card devCard w-25 py-3 px-3 m-5"
              >
                <div className="card-body devBody w-100">
                  <Image
                    src={favDevObj.user.image}
                    size="medium"
                    circular
                    centered
                  />
                  <Header as="h1" inverted textAlign="center">
                    {favDevObj.user.name}
                  </Header>
                  <h3 className="languagesKnown">
                    <u>Languages Known:</u>
                    {this.props.userLanguages
                      .filter(
                        userLanguage =>
                          userLanguage.userId === favDevObj.user.id
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
                        <h3>
                          <i>GitHub Link:</i>{" "}
                          <a href="#">{favDevObj.user.githubLink}</a>
                        </h3>
                      </Grid.Column>
                      <Grid.Column>
                        <h3>
                          <i>Hourly Rate:</i> {favDevObj.user.rates}
                        </h3>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <h3>
                          <i>Email Address:</i>{" "}
                          <a href="#">{favDevObj.user.email}</a>
                        </h3>
                      </Grid.Column>
                      <Grid.Column>
                        <h3>
                          <i>Location:</i> {favDevObj.user.location}
                        </h3>
                      </Grid.Column>
                    </Grid.Row>
                    <button
                      type="button"
                      className="btn deleteBtn btn-primary"
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
                  </Grid>
                </div>
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
