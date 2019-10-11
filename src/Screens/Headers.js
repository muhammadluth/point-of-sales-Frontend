import React, { Component } from "react";
import { Badge, Icon, Layout, Menu, Row, Col, Typography } from "antd";
import "../Assets/Header.css";
import { Link } from "react-router-dom";
import Bodys from "./Bodys";
import AddProduct from "../Component/AddProduct";

const { Header, Sider, Content } = Layout;

class Headers extends React.Component {
  state = {
    collapsed: false,
    count: 0
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  state;

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "http://localhost:3000/";
  }

  render() {
    const { Title } = Typography;
    return (
      <div>
        <Layout id="header" className="fixed">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <Menu theme="dark" mode="inline">
              <Menu.Item key="1">
                <Icon type="home" />
                <span>
                  <Link to={"/dashboard"} style={{ color: "#fff" }}>
                    Home
                  </Link>
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="history" />
                <span>
                  <Link to={"/history"} style={{ color: "#fff" }}>
                    History
                  </Link>
                </span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="plus" />
                <span>
                  <Link to={"/adddata"} style={{ color: "#fff" }}>
                    Manage Data
                  </Link>
                </span>
              </Menu.Item>
              <Menu.Item key="4" onClick={() => this.handleLogout()}>
                <Icon type="logout" />
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{ background: "#001529", padding: 0, textAlign: "right" }}
            >
              <Row>
                <Col span={18}>
                  <div>
                    <p
                      style={{
                        fontSize: "30px",
                        fontWeight: 900,
                        marginRight: "250px",
                        color: "#fff"
                      }}
                    >
                      FOOD GATHERING
                    </p>
                  </div>
                </Col>
              </Row>
            </Header>
            <Bodys handleCount={this.setCount} />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Headers;
