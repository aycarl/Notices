import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectAllNotices } from "./../redux/notices/notice.selectors";
import { selectCurrentUser } from "./../redux/user/user.selectors";

import { Container, Button } from "react-bootstrap";

import CardContainer from "../Components/cards/card-container";
import NewNoticeModal from "../Components/new-notice-modal/new-notice-modal";

import "../Assets/stylesheets/pages.modules.scss";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }
  toggleModal = () => {
    const { modalShow } = this.state;
    this.setState({ modalShow: !modalShow });
  };

  render() {
    const { currentUser, notices } = this.props;
    const { modalShow } = this.state;

    return (
      <Container fluid className="page">
        {currentUser ? (
          <Button
            className="addNoticeBtn"
            variant="primary"
            size="lg"
            block
            onClick={this.toggleModal}
          >
            Add Notice
          </Button>
        ) : null}
        <NewNoticeModal
          show={modalShow}
          onHide={this.toggleModal}
          currentUser={currentUser}
        />
        <CardContainer notices={notices} />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  notices: selectAllNotices
});

export default connect(mapStateToProps)(HomePage);
