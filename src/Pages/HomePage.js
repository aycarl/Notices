import React from "react";

import { Container, Button } from "react-bootstrap";

import CardContainer from "../Components/cards/card-container";
import NewNoticeModal from "../Components/new-notice/new-notice-modal";

import "../Assets/stylesheets/pages.modules.scss";

const HomePage = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container fluid className="page">
      {props.currentUser ? (
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
      <NewNoticeModal show={modalShow} onHide={() => setModalShow(false)}  currentUser={props.currentUser}/>
      <CardContainer />
    </Container>
  );
};

export default HomePage;
