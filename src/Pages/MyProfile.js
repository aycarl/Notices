import React from 'react'
import { connect } from 'react-redux'

import { Container } from 'react-bootstrap'

const MyProfile = ({ currentUser }) => {
  console.log(currentUser)
    return(
      <Container fluid className="page">
        <h1>Profile</h1>
        <hr />
        <p>No data yet</p>
      </Container>
    )
}

const mapStateToProps = ({ user: {currentUser} }) => ({
  currentUser
});

export default connect(mapStateToProps)(MyProfile)