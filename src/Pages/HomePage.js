import React from "react";
import { connect } from 'react-redux';

import { Container, Button } from "react-bootstrap";

import CardContainer from "../Components/cards/card-container";
import NewNoticeModal from "../Components/new-notice-modal/new-notice-modal";

import "../Assets/stylesheets/pages.modules.scss";

const HomePage = ({ currentUser }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container fluid className="page">
      {currentUser ? (
        <Button
          className="addNoticeBtn"
          variant="primary"
          size="lg"
          block
          onClick={() => setModalShow(true)}
        >
          Add Notice
        </Button>
      ) : (
        <div></div>
      )}
      <NewNoticeModal show={modalShow} onHide={() => setModalShow(false)}  currentUser={currentUser}/>
      <CardContainer />
    </Container>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(HomePage);
