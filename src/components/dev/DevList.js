import React, { Component } from "react";
import DevCard from "./DevCard";
import "./dev.css"

export default class DevList extends Component {

  render() {
    return (
      <React.Fragment>
        <section className="cardContainer">
        <div className="devCardContainer">
        {this.props.users
                .map(user => (
                  <DevCard
                    key={user.id}
                    user={user}
                    devCollections={this.props.devCollections}
                    languages={this.props.languages}
                    {...this.props}
                  />
                ))}
        </div>
        </section>
      </React.Fragment>
    );
  }
}
