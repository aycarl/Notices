import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from './Pages/HomePage';
import About from './Pages/About';
import MyProfile from './Pages/MyProfile';

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'><HomePage/></Route>
        <Route path='/about'><About/></Route>
        <Route path='/:userName'><MyProfile/></Route>
      </Switch>
    </Router>
  );
}

export default App;
