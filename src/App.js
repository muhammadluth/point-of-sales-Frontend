import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Public/Redux/store";
import "./App.css";
import SignIn from "./Auth/SignIn";
import AddProduct from "./Component/AddProduct";
import Headers from "./Screens/Headers";
import history from "./Component/history";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/dashboard" component={Headers} />
          <Route excat path="/adddata" component={AddProduct} />
          <Route excat path="/history" component={history} />
        </Router>
      </Provider>
    );
  }
}

export default App;
