import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PortfolioCard from "./PortfolioCard";

export default class Portfolio extends Component {
  //   showButton = portfolio => {

  //     if (
  //       parseInt(portfolio.userId) !== parseInt(sessionStorage.getItem("userId"))
  //     ) {
  //       return (
  //           <button
  //             type="button"
  //             className="btn btn-success"
  //             onClick={() => {
  //               this.props.history.push("/portfolio/new");
  //               // this.props.history.push(`/portfolio/${this.props.portfolio.id}/edit`);
  //             }}
  //           >
  //             Create Portfolio
  //           </button>
  //       );
  //     } else {

  //     }
  //   };
  showButton = () => {
    let check = false;
    this.props.portfolios.forEach(portfolio => {
      console.log("port", portfolio);
      if (portfolio.userId === parseInt(sessionStorage.getItem("userId"))) {
        check = true
      }
    });
    console.log("check", check);
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
            {/* <div className="row">
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
              </div> */}
          </React.Fragment> : ""
        )}
      </React.Fragment>
    );
  }
}
