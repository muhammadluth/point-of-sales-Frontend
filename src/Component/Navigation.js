import React, { Component } from "react";
import { Badge, Icon, Layout, Menu, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default class Navigation extends React.Component {
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
    window.location.href = "/";
  }

  render() {
    const { Title } = Typography;
    return (
      <div id="header" className="sider">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggle}
          />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to={"/dashboard"} style={{ color: "#fff" }}>
                <Icon type="home" />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={"/history"} style={{ color: "#fff" }}>
                <Icon type="history" />
                <span>History</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={"/manage"} style={{ color: "#fff" }}>
                <Icon type="plus" />
                <span>Manage Data</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => this.handleLogout()}>
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    );
  }
}
