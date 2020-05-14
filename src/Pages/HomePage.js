import React, { Component } from "react";

import { Container, Button } from "react-bootstrap";

import CardContainer from "../Components/cards/card-container";

import "../Assets/stylesheets/pages.modules.scss";

class HomePage extends Component {

  render() {
    const { currentUser } = this.props;

    return (
      <Container fluid className="page">
        {currentUser ? (
          <Button className="addNoticeBtn" variant="primary" size="lg" block>
            Add Notice
          </Button>
        ) : (
          <div></div>
        )}
        <CardContainer />
      </Container>
    );
  }
}

export default HomePage;
