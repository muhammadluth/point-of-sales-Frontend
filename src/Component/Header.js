import React, { Component } from "react";
import { Badge, Icon, Layout, Menu, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

export default class Headers extends React.Component {
  render() {
    const { Title } = Typography;
    return (
      <div>
        <Header
          style={{ background: "#001529", padding: 0, textAlign: "center" }}
        >
          <div>
            <Text
              style={{
                fontSize: "30px",
                fontWeight: 900,
                color: "#fff"
              }}
            >
              FOOD GATHERING
            </Text>
          </div>
        </Header>
      </div>
    );
  }
}
