import React, { Component } from "react";
import DevCard from "./DevCard";
import { Dropdown } from "semantic-ui-react";
import "./dev.css";
import APIManager from "../../APIManager/APIManager";

export default class DevList extends Component {
  state = {
    languages: [],
    users: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAll("users")
      .then(users => (newState.users = users))
      .then(() => this.setState(newState));
  }

  languageOptions = [];
  makeLanguageOptions() {
    this.props.languages.map(language => {
      const languageOption = {
        key: language.key,
        text: language.text,
        value: language.id,
        id: language.id
      };
      this.languageOptions.push(languageOption);
    });
  }

  handleOptionsSelected = (event, { value }) => {
    event.preventDefault();
    this.setState({ languages: value }, () =>
      this.filterUsersByLanguage(event)
    );
  };

  filterUsersByLanguage = () => {
    // console.log("this.state.languages", this.state.languages);
    let userArr = this.state.languages.map(language => {
      // console.log("language", language);
      return this.props.userLanguages
        .filter(userLanguage => language === userLanguage.languageId)
        .map(userLanguage => {
          // console.log("userLanguage", userLanguage)
          return this.props.users.filter(
            user => user.id === userLanguage.userId
            );
          });
        });
        const flattenedArr = [].concat(...userArr)
        const evenFlatterArr = [].concat(...flattenedArr)
    console.log("userArr", evenFlatterArr)
    this.setState({ users: evenFlatterArr });
  };

  render() {
    if (this.languageOptions.length === 0) {
      this.makeLanguageOptions();
    }
    return (
      <React.Fragment>
        <section className="cardContainer">
          <div>
            <br />
            <label htmlFor="languages">
              <h2>Filter Options by Languages Known</h2>
            </label>
            <Dropdown
              placeholder=""
              fluid
              multiple
              selection
              className="form-control"
              options={this.languageOptions}
              onChange={this.handleOptionsSelected}
              id="languages"
            />
          </div>
          <div className="devCardContainer">
            {this.state.users.map(user => (
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
