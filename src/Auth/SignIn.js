
import React from "react";
import storage from 'local-storage'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
  FormGroup,
  Form,
  Input,
  Button,
  Row,
  Col
} from "reactstrap";

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      email:'',
      password: '',
      token: ''
    }
  }

  setEmail(e) {
    let value = e.target.value
    this.setState({email: value})
  }
  setPassword(e) {
    let value = e.target.value
    this.setState({password: value})
  }
  
  SignIn(data){
    return new Promise((resolve, reject) => {
      Axios.post('http://localhost:3500/api/v1/users/login', data)
      .then((res) => {
        storage.set('token', res.data.token)
        console.log(storage.get.token)

        resolve()
        window.location.href = '/home'
      }).catch((err) => {
        console.log(err.response.data.message)
        alert(err.response.data.message)
      })
    })
  }

  render() {
    return (
      <>
        <Form style={{textAlign:'center'}}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Input
                  name="email"
                  onChange={(e) => this.setEmail(e)}
                  placeholder="Email"
                  type="email"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
            <FormGroup>
                <Input
                name="password"
                  placeholder="password"
                  onChange={(e) => this.setPassword(e)}
                  type="password"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
            <FormGroup>
                <Button
                  onClick={() => this.SignIn({email : this.state.email, password : this.state.password})}
                  >Submit</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default SignIn;