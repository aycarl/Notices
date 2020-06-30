import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Button } from "react-bootstrap";

import CardContainer from "../Components/cards/card-container";
import NewNoticeModal from "../Components/new-notice-modal/new-notice-modal";

import { firestore } from "./../firebase/firebase.utils";
import { loadNoticeBoard } from "../redux/notices/notice.actions";

import "../Assets/stylesheets/pages.modules.scss";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  // unsubscribeSnapshotFromComponent = null;

  // componentDidMount() {
  //   const { loadNoticeBoard } = this.props;
  //   const noticeBoardRef = firestore.collection("notices");

  //   this.unsubscribeSnapshotFromComponent = noticeBoardRef.onSnapshot(
  //     async (querySnapshot) => {
  //       const notices = querySnapshot.docs.map((snapShot) => {
  //         return snapShot.data()
  //       });

  //       loadNoticeBoard(notices);
  //       console.log("Here: ", notices);
  //     }
  //   );
  // }
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

const mapStateToProps = ({
  user: { currentUser },
  noticeBoard: { notices },
}) => ({
  currentUser,
  notices,
});

// const matchDispatchToProps = (dispatch) => ({
//   loadNoticeBoard: (notices) => dispatch(loadNoticeBoard(notices)),
// });

export default connect(mapStateToProps)(HomePage);
