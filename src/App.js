import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Public/Redux/store";
import "./App.css";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Manage from "./Screens/Manage";
import Dashboard from "./Screens/Dashboard";
import History from "./Screens/History";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route excat path="/manage" component={Manage} />
          <Route excat path="/history" component={History} />
        </Router>
      </Provider>
    );
  }
}

export default App;
