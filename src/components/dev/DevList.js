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
    this.setState({ languages: value, users: [] }, () => {
      console.log("this.state", this.state.users);
      this.filterUsersByLanguage(event);
    });
  };

  filterUsersByLanguage = () => {
    let userArr = this.state.languages.map(language => {
      return this.props.userLanguages
        .filter(userLanguage => language === userLanguage.languageId)
        .map(userLanguage => {
          // console.log("userLanguage", userLanguage)
          return this.props.users.filter(
            user => user.id === userLanguage.userId
          )[0] //keeps us from having at least one extra level of arrays
        })
    });
    const flattenedArr = userArr.flat() //flat() is new way of flattening an array!
    .reduce( (objectsSoFar, currentObj) => { //all of this is for filtering out the duplicate users
      console.log(objectsSoFar)
      const user = objectsSoFar.find( obj => obj.id === currentObj.id)
      if(!user) {
        // add current object in loop to the array of objects we've examined so far in the loop
        return objectsSoFar.concat([currentObj])
      } else {
        // basically skip the current obj and just keep moving through the array without it
        return objectsSoFar
      }
    }, [])

    this.setState({ users: flattenedArr });
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
            {/* <label htmlFor="languages"> */}
              <h2 className="heading">Filter Options by Languages Known</h2>
            {/* </label> */}
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
                addDevOfInterest={this.props.addDevOfInterest}
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
