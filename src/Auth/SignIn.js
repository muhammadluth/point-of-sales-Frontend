import React from "react";
import Axios from "axios";
import { Form, Input, Button, Row, Col, Typography } from "antd";

const { Text } = Typography;

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  setEmail(e) {
    const value = e.target.value;
    this.setState({ email: value });
  }

  setPassword(e) {
    const value = e.target.value;
    this.setState({ password: value });
  }

  // SignIn(data) {
  //   return new Promise((resolve, reject) => {
  //     console.log(data);
  //     Axios.post("http://localhost:3500/api/v1/users/login", data)
  //       .then(res => {
  //         console.log(res);
  //         // localStorage.set("token", res.data.token);
  //         // localStorage.set("username", res.data.token);
  //         localStorage.setItem("token", `Bearer ${res.data.token}`);
  //         console.log(localStorage.get.token);

  //         resolve();
  //         window.location.href = "/dashboard";
  //       })
  //       .catch(err => {
  //         console.log(err.res);
  //         alert(err.res);
  //       });
  //   });
  // }
  handleLogin() {
    const emails = this.state.email;
    const passwords = this.state.password;

    Axios.post("http://localhost:3500/api/v1/users/login", {
      email: emails,
      password: passwords
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === 200) {
          localStorage.setItem("user", `${res.data.username}`);
          // localStorage.setItem("expire_at", expire_at);
          localStorage.setItem("token", `Bearer: ${res.data.token}`);
          window.location.href = "http://localhost:3000/dashboard";
          alert("Masuk");
        } else {
          window.location.href = "http://localhost:3000/";
          alert("Gagal");
        }
      })
      .catch(err => {
        console.log(err);
        alert("username or password incorect");
      });
  }

  render() {
    return (
      <div>
        <Form style={{ textAlign: "center" }}>
          <Row>
            <Col span={9} />
            <Col span={6}>
              <Text style={{ fontSize: "24px", fontWeight: 900 }}>LOGIN</Text>
              <Form onSubmit={this.handleLogin}>
                <Input
                  name="email"
                  onChange={e => this.setEmail(e)}
                  placeholder="Email"
                  type="email"
                />
              </Form>
            </Col>
            <Col span={9} />
          </Row>
          <Row>
            <Col span={9} />
            <Col span={6}>
              <Form>
                <Input
                  name="password"
                  placeholder="password"
                  onChange={e => this.setPassword(e)}
                  type="password"
                />
              </Form>
            </Col>
            <Col span={9} />
          </Row>
          <Row>
            <Col span={9} />
            <Col span={6}>
              <Form>
                <Button
                  type="primary"
                  style={{ marginTop: "5px" }}
                  onClick={() =>
                    this.handleLogin({
                      email: this.state.email,
                      password: this.state.password
                    })
                  }
                >
                  Submit
                </Button>
                {/* <Link to={"/SignUp"}>SignUp</Link> */}
              </Form>
            </Col>
            <Col span={9} />
          </Row>
        </Form>
      </div>
    );
  }
}

export default SignIn;
