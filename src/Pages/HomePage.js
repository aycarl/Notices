import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'

import CardContainer from '../Components/cards/card-container'

class HomePage extends Component{
  constructor(props){
    super();
    this.state = {

    }
  }

  render(){
    return(
      <Container fluid >
        <CardContainer/>
      </Container>
    )
  }
}

export default HomePage