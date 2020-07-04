import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./../redux/user/user.selectors";

import Nav from "react-bootstrap/Nav";

import { auth } from "../firebase/firebase.utils";

import styles from "./../Assets/stylesheets/header.module.scss";
import { Link } from "react-router-dom";

const Header = ({ currentUser }) => {
  return (
    <Nav className={`${styles.header} justify-content-end`} activeKey="/">
      <Nav.Item className={styles.options}>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      {currentUser ? (
        <Nav.Item className={styles.options}>
          <Nav.Link
            as={Link}
            to={`/${currentUser.displayName}`}
            eventKey="link-profile"
          >
            Your profile
          </Nav.Link>
        </Nav.Item>
      ) : (
        <Nav.Item className={styles.options}>
          <Nav.Link as={Link} to="/about" eventKey="link-about">
            About
          </Nav.Link>
        </Nav.Item>
      )}
      {currentUser ? (
        <Nav.Item className={styles.options}>
          <Nav.Link onClick={() => auth.signOut()} eventKey="link-sign-out">
            Sign Out
          </Nav.Link>
        </Nav.Item>
      ) : (
        <Nav.Item className={styles.options}>
          <Nav.Link as={Link} to="/signin" eventKey="link-sign-in">
            Sign In
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
