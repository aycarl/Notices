import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { createNewNotice } from "../../firebase/firebase.utils";

import "./new-notice-modal.styles.scss";

const NewNoticeModal = (props) => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeBody, setNoticeBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let timestamp = new Date();
    
    let notice = {
      noticeId: timestamp.getTime().toString(),
      title: noticeTitle,
      body: noticeBody,
    };

    try {
      await createNewNotice(notice, props.currentUser);
    } catch (error) {
      console.log("error message", error.message);
    }

    console.log("This was typed " + noticeTitle + " " + noticeBody);
    setNoticeBody("");
    setNoticeTitle("");
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
              placeholder="Enter notice title"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupNoticeBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter notice body (250 chars max)"
              value={noticeBody}
              onChange={(e) => setNoticeBody(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupFileInput">
            <Form.Label>Image/Poster (optional)</Form.Label>
            <Form.File.Input />
          </Form.Group>
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

export default NewNoticeModal;
