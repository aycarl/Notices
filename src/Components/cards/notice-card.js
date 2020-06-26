import React from "react";

import { Card } from "react-bootstrap";

const NoticeCard = ({ id, isQuote, alignment, citation, title, body, timestamp }) => {
  console.log("renders!!!");
  return (
    <div>
      {isQuote ? (
        <Card className={alignment} key={id} >
          <blockquote className="blockquote mb-0 card-body">
            <p>{body}</p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                <cite title="Source Title">{citation}</cite>
              </small>
            </footer>
          </blockquote>
        </Card>
      ) : (
        <Card bg="light" text="dark" key={id}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {body}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{timestamp}</small>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default NoticeCard;
