import React, { Component } from 'react'

import Menu from '../Components/Menu'

class HomePage extends Component{
  constructor(props){
    super();
    this.state = {

    }
  }

  render(){
    return(
      <div className="App">
        <header className="App-header">
          Notice
          <Menu myUserName='Carl' />
        </header>
      </div>
    )
  }
}

export default HomePage