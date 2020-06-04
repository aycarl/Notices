import React from "react";
import { connect } from "react-redux";

import { Container, Button } from "react-bootstrap";

import CardContainer from "../Components/cards/card-container";
import NewNoticeModal from "../Components/new-notice-modal/new-notice-modal";

import "../Assets/stylesheets/pages.modules.scss";

const HomePage = ({ currentUser, notices }) => {
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
        null
      )}
      <CardContainer notices={notices} />
      <NewNoticeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentUser={currentUser}
      />
    </Container>
  );
};

const mapStateToProps = ({
  user: { currentUser },
  noticeBoard: { notices },
}) => ({
  currentUser,
  notices,
});

export default connect(mapStateToProps)(HomePage);
