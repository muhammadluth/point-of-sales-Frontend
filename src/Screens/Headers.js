import React, { Component } from "react";
import {
  Badge,
  Icon,
  Layout,
  Menu,
  Row,
  Col,
  Typography,
} from "antd";
import "../Assets/Header.css";
import { Link } from "react-router-dom";
import Bodys from './Bodys'
import AddProduct from '../Component/AddProduct'



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

  setCount = (count) => {
    this.setState({
      count : count
    })

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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="home" />
                <span>
                <Link to={"/"} style={{ color: "#fff" }}>
                    Home
                </Link>
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="history" />
                <span>History</span>
              </Menu.Item>
              {/* <Menu.Item key="3">
                <Icon type="user" />
                <span>
                  <Link to={"/SignIn"} style={{ color: "#fff" }}>
                    SignIn or SignUp
                  </Link>
                </span>
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{ background: "#001529", padding: 0, textAlign: "right" }}
            >
              <Row>
                <Col span={18}>
                </Col>
                <Col span={6}>
                  <p
                    style={{
                      fontSize: "30px",
                      textAlign: "center",
                      fontWeight: 900,
                      color: "#fff"
                    }}
                  >
                    CARTS
                    <Badge count={this.state.count} showZero style={{ fontSize: "20px" }}>
                      <a href="#" className="head-example" />
                    </Badge>
                  </p>
                </Col>
              </Row>
            </Header>
            <Bodys 
            handleCount ={this.setCount} />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Headers
