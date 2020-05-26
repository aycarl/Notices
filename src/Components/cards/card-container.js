import React, { Component } from "react";
import { connect } from "react-redux";

import { CardColumns } from "react-bootstrap";
import NoticeCard from "./notice-card";

import { readAllNotices } from "./../../firebase/firebase.utils";
import { loadNoticeBoard } from "./../../redux/notices/notice.actions";

class CardContainer extends Component {

  componentDidMount() {
    const { loadNoticeBoard } = this.props;

    const noticeFirestoreList = readAllNotices();

    loadNoticeBoard(noticeFirestoreList);
  }

  render() {
    const { notices } = this.props;
    console.log("This is the Redux list: ", notices);

    return (
      <CardColumns>
        {notices.map(
          ({
            quoteIndicator,
            createdAt,
            noticeId,
            quoteAlignment,
            quoteCitation,
            body,
            title,
          }) => (
            <NoticeCard
              key={noticeId}
              isQuote={quoteIndicator}
              title={title}
              body={body}
              timestamp={createdAt}
              alignment={quoteAlignment}
              citation={quoteCitation}
            />
          )
        )}
      </CardColumns>
    );
  }
}

const mapStateToProps = ({ noticeBoard }) => ({
  notices: noticeBoard.notices,
});

const matchDispatchToProps = (dispatch) => ({
  loadNoticeBoard: (notices) => dispatch(loadNoticeBoard(notices)),
});

export default connect(mapStateToProps, matchDispatchToProps)(CardContainer);
