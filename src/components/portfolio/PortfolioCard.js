import React, { Component } from "react";

export default class PortfolioCard extends Component {

  render() {
    return (
      <div className="card portfolioCard w-25">
        <div className="card-body portfolioBody">
          <p className="card-title">Name: {this.props.portfolio.name}</p>
          <p className="card">Languages Known: {this.props.portfolio.languages}</p>
          <p className="card">Deployed Apps: {this.props.portfolio.apps}</p>
          <p>Hourly Rate: {this.props.portfolio.rate}</p>
          <p>Email Address: {this.props.portfolio.email}</p>
          <p>Location: {this.props.portfolio.location}</p>
          <button
            type="button"
            className="btn-success"
            onClick={() => {
              this.props.history.push(`/portfolio/${this.props.portfolio.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => this.props.deletePortfolio(this.props.portfolio.id)}
            className="btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}