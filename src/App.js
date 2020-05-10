import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import MyProfile from "./Pages/MyProfile";
import SignInAndSignUpPage from "./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from './Components/Header'

import { auth } from './firebase/firebase.utils'

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscibeFromAuth = null

  componentDidMount() {
    this.unsubscibeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});
      console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscibeFromAuth()
  }

  render() {
    return (
      <Router>
        <Header myUserName="Carl" currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/signin" component={SignInAndSignUpPage} />
          <Route path="/:userName">
            <MyProfile />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
