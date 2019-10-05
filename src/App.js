import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import IndexHome from './Screens/IndexHome'
import ListProduct from './Component/ListProduct'
import AddProduct from './Component/AddProduct'
import Carts from './Component/Carts'
import Headers from './Screens/Headers'
import Bodys from './Screens/Bodys'

class App extends Component {
  render () {
    return (
        <Router>
          <Route exact path='/' component={SignIn} />
          <Route exact path='/home' component={Headers} />
          <Route excat path='/post' component={AddProduct} />
          <Route excat path='/SignUp' component={SignUp} />
          {/* <Route exact path='/SignIn' component={SignIn} /> */}
          {/* <Route excat path='/SignUp' component={SignUp} />
          <Route path='/get' component={ListProduct} />
          <Route excat path='/post' component={AddProduct} />
          <Route path='/carts' component={Carts} /> */}
        </Router>
    );
  }
}

export default App
