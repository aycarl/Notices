import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import MyProfile from "./Pages/MyProfile";
import SignInAndSignUpPage from "./Pages/SigninAndSignup/SigninAndSignup";

import Header from "./Components/Header";

import { auth, createUserProfileDocument, firestore } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { loadNoticeBoard } from "./redux/notices/notice.actions";

import { selectCurrentUser } from "./redux/user/user.selectors";

import "./App.css";

class App extends React.Component {
  unsubscibeFromAuth = null;
  unsubscribeSnapshotFromComponent = null;

  componentDidMount() {
    const { setCurrentUser, loadNoticeBoard } = this.props;

    this.unsubscibeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) =>
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          })
        );
      } 
      setCurrentUser(userAuth);
    });
    
    const noticeBoardRef = firestore.collection("notices");

    this.unsubscribeSnapshotFromComponent = noticeBoardRef.onSnapshot(
      async (querySnapshot) => {
        const notices = querySnapshot.docs.map((snapShot) => {
          return snapShot.data()
        });

        loadNoticeBoard(notices);
      }
    );
  }

  componentWillUnmount() {
    this.unsubscibeFromAuth();
    this.unsubscribeSnapshotFromComponent();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
          <Route path="/:userName" component={MyProfile} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const matchDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  loadNoticeBoard: notices => dispatch(loadNoticeBoard(notices))
});

export default connect(mapStateToProps, matchDispatchToProps)(App);
