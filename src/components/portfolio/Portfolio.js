import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PortfolioCard from "./PortfolioCard"

export default class Portfolio extends Component {
    render() {
      return (
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
          <div className="row">
              {this.props.portfolios
              .filter(
                portfolio =>
                  parseInt(portfolio.userId) ===
                  parseInt(sessionStorage.getItem("userId")))
              .map(portfolio => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} {...this.props} />
            ))}
          </div>
        </React.Fragment>
      );
    }
  }