import React from "react";
import { connect } from "react-redux";

import { Nav, Navbar } from "react-bootstrap";

import { auth } from "../firebase/firebase.utils";

import styles from "./../Assets/stylesheets/header.module.scss";

const Header = ({ currentUser }) => {
  return (
    <Navbar bg="light">
      <Nav className={`${styles.header} justify-content-end`} activeKey="/">
        <Navbar.Brand className={styles.brandName} href="/">Notices</Navbar.Brand>
        <Nav.Item className={styles.options}>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        {currentUser ? (
          <Nav.Item className={styles.options}>
            <Nav.Link
              href={`/${currentUser.displayName}`}
              eventKey="link-profile"
            >
              Profile
            </Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item className={styles.options}>
            <Nav.Link href="/about" eventKey="link-about">
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
            <Nav.Link href="/signin" eventKey="link-sign-in">
              Sign In
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
