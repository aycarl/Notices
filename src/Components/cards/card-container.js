import React, { Component } from "react";
import { connect } from "react-redux";

import { CardColumns, Card } from "react-bootstrap";
import NoticeCard from "./card";

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

    return (
      <CardColumns>
        <Card>
          <Card.Body>
            <Card.Title>Card title that wraps to a new line</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="p-3">
          <blockquote className="blockquote mb-0 card-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card bg="light" text="dark" className="text-center p-3">
          <blockquote className="blockquote mb-0 card-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </Card>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
            <Card.Text>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="text-right">
          <blockquote className="blockquote mb-0 card-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                Someone Infamous in{" "}
                <cite title="Source Title">Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
            <Card.Text>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
          </Card.Body>
        </Card>
        <NoticeCard />
      </CardColumns>
    );
  }
}

const mapStateToProps = ({ noticeBoard }) => ({
  notices: noticeBoard,
});

const matchDispatchToProps = (dispatch) => ({
  loadNoticeBoard: (notices) => dispatch(loadNoticeBoard(notices)),
});

export default connect(mapStateToProps, matchDispatchToProps)(CardContainer);
