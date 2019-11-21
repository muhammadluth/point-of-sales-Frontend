import React from "react";
import { Form, Input, Button, Row, Col, Typography, Card } from "antd";
import Http from "../Public/Utils/Http";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";
import "../Assets/style.css";

const { Text } = Typography;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  setUsername(e) {
    const value = e.target.value;
    this.setState({ username: value });
  }

  setEmail(e) {
    const value = e.target.value;
    this.setState({ email: value });
  }

  setPassword(e) {
    const value = e.target.value;
    this.setState({ password: value });
  }
  handleRegister() {
    const usernames = this.state.username;
    const emails = this.state.email;
    const passwords = this.state.password;

    Http.post(`/api/v1/users/register`, {
      username: usernames,
      email: emails,
      password: passwords
    })
      .then(res => {
        console.log(res);
        window.location.href = "/";
        alert("Masuk");
      })
      .catch(err => {
        console.log(err);
        window.location.href = "/SignUp";
        alert("Please, fill in your personal");
      });
  }

  render() {
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.username);
    return (
      <div>
        <Row>
          <Col span={12}>
            <div>
              <Card className="cardAuth">
                <Row style={{ marginTop: -30 }}>
                  <Col>
                    <img
                      alt="example"
                      src={require("../Assets/img/FoodGathering.png")}
                      style={{ width: 150, height: 110 }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 80 }}>
                  <Col style={{ margin: 20 }}>
                    <Title
                      style={{
                        textAlign: "center",
                        marginBottom: 70,
                        color: "#fff"
                      }}
                    >
                      WELCOME to FOOD GATHERING
                    </Title>
                    <Text style={{ fontSize: 18, color: "#fff" }}>
                      Food Gathering is a WEB based Point of Sales application.
                      This application is a cashier application where the
                      customer can directly order the available products and
                      directly conduct transactions on the spot with the cash
                      payment method.
                    </Text>
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginRight: 100, marginLeft: 100, marginTop: 150 }}>
              <Card style={{ borderColor: "black", borderRadius: 20 }}>
                <Form style={{ textAlign: "center" }}>
                  <Text style={{ fontSize: "24px", fontWeight: 900 }}>
                    REGISTER
                  </Text>
                  <Form style={{ marginBottom: 20, marginTop: 50 }}>
                    <Input
                      style={{ borderColor: "black" }}
                      name="username"
                      onChange={e => this.setUsername(e)}
                      placeholder="Username"
                      type="username"
                    />
                  </Form>
                  <Form style={{ marginBottom: 20 }}>
                    <Input
                      style={{ borderColor: "black" }}
                      name="email"
                      onChange={e => this.setEmail(e)}
                      placeholder="Email"
                      type="email"
                    />
                  </Form>
                  <Form>
                    <Input
                      style={{ borderColor: "black" }}
                      name="password"
                      placeholder="Password"
                      onChange={e => this.setPassword(e)}
                      type="password"
                    />
                  </Form>
                  <Form>
                    <Button
                      type="primary"
                      style={{ marginTop: 50 }}
                      onClick={() =>
                        this.handleRegister({
                          username: this.state.username,
                          email: this.state.email,
                          password: this.state.password
                        })
                      }
                    >
                      <Link to={"/"}>REGISTER</Link>
                    </Button>
                  </Form>
                  {/* <Link to={"/SignUp"}>SignUp</Link> */}
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignUp;
