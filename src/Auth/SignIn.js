import React from "react";
import { Form, Input, Button, Row, Col, Typography, Card } from "antd";
import Http from "../Public/Utils/Http";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";
import "../Assets/style.css";

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
  handleLogin() {
    const emails = this.state.email;
    const passwords = this.state.password;

    Http.post(`/api/v1/users/login`, {
      email: emails,
      password: passwords
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === 200) {
          localStorage.setItem("user", `${res.data.username}`);
          localStorage.setItem("token", `${res.data.token}`);
          window.location.href = "/dashboard";
          alert("Masuk");
        } else {
          window.location.href = "/";
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
            <div style={{ marginTop: 40 }}>
              <Row>
                <Col span={14} />
                <Col span={6}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      alignItems: "right"
                    }}
                  >
                    Don't have an Account
                  </Text>
                </Col>
                <Col span={4}>
                  <Button
                    style={{
                      backgroundColor: "#001529",
                      fontWeight: "bold",
                      color: "#fff",
                      marginTop: -3,
                      marginLeft: 5
                    }}
                  >
                    <Link to={"/SignUp"}>Register</Link>
                  </Button>
                </Col>
              </Row>
            </div>
            <div style={{ marginRight: 100, marginLeft: 100, marginTop: 100 }}>
              <Card style={{ borderColor: "black", borderRadius: 20 }}>
                <Form style={{ textAlign: "center" }}>
                  <Text style={{ fontSize: "24px", fontWeight: 900 }}>
                    LOGIN
                  </Text>
                  <Form style={{ marginBottom: 20, marginTop: 50 }}>
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
                        this.handleLogin({
                          email: this.state.email,
                          password: this.state.password
                        })
                      }
                    >
                      LOGIN
                    </Button>
                  </Form>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignIn;
