import React, { Component } from "react";
import { Image, Divider, Grid, Header } from "semantic-ui-react";
import "../dev/dev.css";

export default class UserCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="userCardContainer">
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
        <div className="card w-75 py-4 m-5 px-4">
          <div className="card-body userBody">
            <Image
              src={this.props.user.image}
              size="medium"
              circular
              centered
            />
            <Header as="h1" inverted textAlign="center">
              {this.props.user.name}
            </Header>
            <h3 className="languagesKnown">
              <u>Languages Known:</u>
              {this.props.userLanguages.map(language => (
                <div key={language.id}> - {language.language.text}</div>
              ))}
            </h3>
            <Grid celled="internally" columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <h3 className="deployedApps">
                    <i>Github link:</i>{" "}
                    <a href="#">{this.props.user.githubLink}</a>
                  </h3>
                </Grid.Column>
                <Grid.Column>
                  <h3 className="hourlyRate">
                    <i>Hourly Rate:</i> {this.props.user.rates}
                  </h3>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <h3 className="emailAddress">
                    <i>Email Address:</i> <a href="#">{this.props.user.email}</a>
                  </h3>
                </Grid.Column>
                <Grid.Column>
                  <h3 className="location">
                    <i>Location:</i> {this.props.user.location}
                  </h3>
                </Grid.Column>
              </Grid.Row>
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
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you wish to delete your portfolio?"
                    )
                  )
                    this.props
                      .deleteUser(this.props.user.id)
                      .then(this.props.history.push("/"))
                      .then(sessionStorage.clear());
                }}
                className="btn deleteBtn btn-danger"
              >
                Delete
              </button>
            </Grid>
          </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}
