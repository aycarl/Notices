import React from "react";

import { Link } from "react-router-dom";

import { auth } from '../firebase/firebase.utils'

import styles from './../Assets/stylesheets/header.module.css'

const Header = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles.options}>
        <div className={styles.option}>Home</div>
        <div className={styles.option}>{props.myUserName}'s profile</div>
        <div>About</div>
      </div>
      {
        props.currentUser ?
        <div className={styles.option} onClick={() => auth.signOut() }></div>
        :
        <Link to="/signin">
          <div>Sign In</div>
        </Link>
      }
    </div>
  );
};

export default Header;
