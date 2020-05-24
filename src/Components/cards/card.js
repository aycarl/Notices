import React from "react";

import { Card } from "react-bootstrap";

const NoticeCard = ({ props }) => {
  return (
    <div>
      <Card bg="light" text="dark">
        <Card.Img
          variant="top"
          src={require("./../../Assets/img/minus design - minimal-04.png")}
        />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action. Some quick example text to
            build on the card title and make up the bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card className="text-right">
        <blockquote className="blockquote mb-0 card-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <footer className="blockquote-footer">
            <small className="text-muted">
              Someone Infamous in <cite title="Source Title">Source Title</cite>
            </small>
          </footer>
        </blockquote>
      </Card>
    </div>
  );
};

export default NoticeCard;
