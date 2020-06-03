import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home"
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          </Switch>
          </Router>
          
    );
  }
}

export default App;
