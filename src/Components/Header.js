import React from "react";
import Nav from "react-bootstrap/Nav";

import { auth } from "../firebase/firebase.utils";

import styles from "./../Assets/stylesheets/header.module.scss";

const Header = ({ currentUser }) => {
  return (
    <Nav className={`${styles.header} justify-content-end`} activeKey="/">
      <Nav.Item className={styles.options}>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      {currentUser ? (
        <Nav.Item className={styles.options}>
          <Nav.Link
            href={`/${currentUser.displayName}`}
            eventKey="link-profile"
          >
            Your profile
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
  );
};

export default Header;
