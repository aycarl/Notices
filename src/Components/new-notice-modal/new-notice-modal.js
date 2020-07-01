import React, { useState } from "react";
//import { connect } from "react-redux";

import { Modal, Button, Form, Col } from "react-bootstrap";

import { createNewNotice } from "../../firebase/firebase.utils";
// import { addNotice } from "./../../redux/notices/notice.actions";

import "./new-notice-modal.styles.scss";

const NewNoticeModal = ({ currentUser, addNotice, ...props }) => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeBody, setNoticeBody] = useState("");
  const [noticeQuoteCitation, setNoticeQuoteCitation] = useState("");
  const [toggleDisabled, toggleDisabledIndicator] = useState(false);
  const [noticeQuoteAlignment, setNoticeQuoteAlignment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let timestamp = new Date();

    let notice = {
      noticeId: timestamp.getTime().toString(),
      title: noticeTitle,
      body: noticeBody,
      quoteCitation: noticeQuoteCitation,
      quoteIndicator: toggleDisabled,
      quoteAlignment: noticeQuoteAlignment,
    };

    try {
      await createNewNotice(notice, currentUser);

      // noticeRef.onSnapshot((snapShot) =>
      //   addNotice({
      //     id: snapShot.id,
      //     ...snapShot.data()
      //   })
      // );

    } catch (error) {
      console.log("error message", error.message);
    }

    console.log("This was typed " + noticeTitle + " " + noticeBody);
    setNoticeBody("");
    setNoticeTitle("");
    setNoticeQuoteAlignment("");
  };

  const handleChange = (event) => {
    toggleDisabledIndicator(!toggleDisabled);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Notice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formGroupNoticeTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter notice title (if not a quote)"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              disabled={toggleDisabled}
            />
          </Form.Group>
          <Form.Group controlId="formGroupNoticeBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter notice text/quote (250 chars max)"
              value={noticeBody}
              onChange={(e) => setNoticeBody(e.target.value)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupFileInput">
              <Form.Label>Image/Poster (optional)</Form.Label>
              <Form.File.Input />
            </Form.Group>
            <Form.Group as={Col} controlId="formQuoteToggle">
              <Form.Check
                type="switch"
                label="This is a quote."
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formQuoteCitation">
              <Form.Label>Quote Citation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter citation (name, source, ...)"
                value={noticeQuoteCitation}
                onChange={(e) => setNoticeQuoteCitation(e.target.value)}
                disabled={!toggleDisabled}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formQuoteAlignment">
              <Form.Label>Quote Text Alignment</Form.Label>
              <Form.Control
                as="select"
                disabled={!toggleDisabled}
                value={noticeQuoteAlignment}
                onChange={(e) => setNoticeQuoteAlignment(e.target.value)}
              >
                <option value="text-right">Right Align</option>
                <option value="text-left">Left Align</option>
                <option value="text-center">Center Align</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="cancel-button"
            onClick={props.onHide}
          >
            Cancel
          </Button>
          <Button className="submit-button" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// const matchDispatchToProps = dispatch => ({
//   addNotice: (notice) => dispatch(addNotice(notice))
// });

export default NewNoticeModal;
