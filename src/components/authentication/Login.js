import React, { Component } from "react";
import APIManager from "../../APIManager/APIManager";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleLogin = evt => {
    evt.preventDefault();
    APIManager.getAll("users").then(users => {
      const singleUser = users.find(
        element =>
          element.email.toLowerCase() === this.state.email.toLowerCase() &&
          element.password.toLowerCase() === this.state.password.toLowerCase()
      );
      if (singleUser) {
        sessionStorage.setItem("userId", singleUser.id);
        this.props.history.push("/user");
      } else {
        window.alert(
          "Invalid login information. Please try again, or register a new account."
        );
      }
    });
  };

  render() {
    return (
      <Grid
        textAlign="center"
        onSubmit={this.handleLogin}
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                id="email"
                onChange={this.handleFieldChange}
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                icon="lock"
                id="password"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleFieldChange}
              />

              <Button color="teal" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          &nbsp;
          <Button
            onClick={() => this.props.history.push("/register")}
          >
            Register New Account
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}
//       <form onSubmit={this.handleLogin}>
//         <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
//         <label htmlFor="inputEmail">Email address:&nbsp;</label>
//         <input
//           onChange={this.handleFieldChange}
//           type="email"
//           id="email"
//           placeholder="Email address"
//           required=""
//           autoFocus=""
//         />
//         <br />
//         <label htmlFor="inputPassword">Password:&nbsp;</label>
//         <input
//           onChange={this.handleFieldChange}
//           type="password"
//           id="password"
//           placeholder="Password"
//           required=""
//         />
//         &nbsp;
//         <button type="submit" className="btn btn-info btn-sm login-button">
//           Sign in
//         </button>
//         <br />
//         <button
//           type="button"
//           className="btn btn-secondary btn-sm"
//           onClick={() => this.props.history.push("/register")}
//         >
//           Register New Account
//         </button>
//       </form>
//     );
//   }
// }
