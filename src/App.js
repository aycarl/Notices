import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import MyProfile from "./Pages/MyProfile";
import SignInAndSignUpPage from "./Pages/SigninAndSignup/SigninAndSignup";

import Header from "./Components/Header";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscibeFromAuth = null;

  componentDidMount() {
    this.unsubscibeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) =>
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }));
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscibeFromAuth();
  }

  render() {

    const { currentUser } = this.state;

    return (
      <Router>
        <Header myUserName="Carl" currentUser={currentUser} />
        <Switch>
          <Route exact path="/" ><HomePage currentUser={currentUser} /></Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/signin" render={() => this.state.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}/>
          <Route path="/:userName" component={MyProfile} />
        </Switch>
      </Router>
    );
  }
}

export default App;
