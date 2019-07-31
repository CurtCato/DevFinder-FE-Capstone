import React, { Component } from "react";
import DevCard from "./DevCard";
import "./dev.css"

export default class DevList extends Component {

  render() {
    return (
      <React.Fragment>
        <section className="cardContainer">
        <div className="devCardContainer">
        {this.props.portfolios
                .map(portfolio => (
                  <DevCard
                    key={portfolio.id}
                    portfolio={portfolio}
                    {...this.props}
                  />
                ))}
        </div>
        </section>
      </React.Fragment>
    );
  }
}
