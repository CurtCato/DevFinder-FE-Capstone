import React, { Component } from "react";

export default class DevCard extends Component {

    state = {
        userId: "",
        name: "",
        languages: "",
        apps: "",
        rate: "",
        email: "",
        location: "",
        isOfInterest: "",
        id: ""
      };

constructor(props) {
    super(props)
    this.handleOfInterestClick = this.handleOfInterestClick.bind(this)
    this.state = {isOfInterest: false}
}

handleOfInterestClick() {
    this.setState({isOfInterest: true})
}

  render() {

    return (
      <div className="card devCard w-25 bg-light">
        <div className="card-body devBody w-100">
          <p className="card-title">Name: {this.props.portfolio.name}</p>
          <p className="card">Languages Known: {this.props.portfolio.languages}</p>
          <p className="card">Deployed Apps: {this.props.portfolio.apps}</p>
          <p>Hourly Rate: {this.props.portfolio.rate}</p>
          <p>Email Address: {this.props.portfolio.email}</p>
          <p>Location: {this.props.portfolio.location}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
                console.log(this.props.portfolio)
                this.handleOfInterestClick()
                console.log(this.isOfInterest)
            }}
          >
            Save Dev
          </button>
        </div>
      </div>
    );
  }
}