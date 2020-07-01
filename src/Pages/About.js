import React from "react";
import { Container } from "react-bootstrap";

import "./../Assets/stylesheets/pages.modules.scss";

const About = () => {
  return (
    <Container fluid className="page">
      <h1>About</h1>
      <hr />
      <p>This is a simple virtual notice board application.</p>
      <p>Feel free to catch up with random posts and add yours too!</p>
    </Container>
  );
};

export default About;
