import React from 'react'

import { Link } from 'react-router-dom'

import { auth } from '../firebase/firebase.utils'

import styles from './../Assets/stylesheets/header.module.css'

const Header = ({myUserName, currentUser}) => {
  return (
    <div className={styles.header}>
      <div className={styles.options}>
        <Link to='/'><div className={styles.option}>Home</div></Link>
        <Link to='/'><div className={styles.option}>{myUserName}'s profile</div></Link>
        <Link to='/about'><div className={styles.option}>About</div></Link>
      {
        currentUser ?
        <div className={styles.option} onClick={() => auth.signOut() }>Sign Out</div>
        :
        <Link to="/signin" className={styles.option}>Sign In</Link>
      }
      </div>
    </div>
  );
};

export default Header;
