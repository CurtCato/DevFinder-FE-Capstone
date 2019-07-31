import React, { Component } from "react";
import PortfolioCard from "./PortfolioCard";

export default class Portfolio extends Component {

  showButton = () => {
    let check = false;
    this.props.portfolios.forEach(portfolio => {
      if (portfolio.userId === parseInt(sessionStorage.getItem("userId"))) {
        check = true
      }
    });
    return check;
  };
  render() {
    return (
      <React.Fragment>
        {this.showButton() ? (
          <React.Fragment>
            <div className="row">
              {this.props.portfolios
                .filter(
                  portfolio =>
                    parseInt(portfolio.userId) ===
                    parseInt(sessionStorage.getItem("userId"))
                )
                .map(portfolio => (
                  <PortfolioCard
                    key={portfolio.id}
                    portfolio={portfolio}
                    {...this.props}
                  />
                ))}
            </div>
          </React.Fragment>
        ) : "" }
        {(
            !this.showButton() ?
          <React.Fragment>
            <div className="createPortfolioButton">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.props.history.push("/portfolio/new");
                }}
              >
                Create Portfolio
              </button>
            </div>
          </React.Fragment> : ""
        )}
      </React.Fragment>
    );
  }
}
