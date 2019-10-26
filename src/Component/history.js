import React, { Component } from "react";
import {
  Icon,
  Layout,
  Menu,
  Row,
  Col,
  Typography,
  Card,
  Select,
  Table
} from "antd";
import { Line } from "react-chartjs-2";
import "../Assets/Header.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import ConvertRupiah from "rupiah-format";

const { Header, Sider } = Layout;
const { Option } = Select;
const { Column } = Table;
const { Title } = Typography;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chart: [],
      recent: [],
      visible: false,
      total: 0,
      collapsed: false,
      count: 0
    };
  }

  componentDidMount() {
    this.getHistory();
  }
  getHistory = async () => {
    await Axios.get("http://localhost:3500/api/v1/history/")
      .then(result => {
        this.setState({
          data: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getRevenue = async value => {
    console.log(value);
    await Axios.get(`http://localhost:3500/api/v1/order/revenue?by=${value}`)
      .then(result => {
        console.log(result);
        this.setState({
          chart: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  getRecentOrder = async value => {
    console.log(value);
    await Axios.get(`http://localhost:3500/api/v1/order/revenue?by=${value}`)
      .then(result => {
        console.log(result);
        this.setState({
          recent: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "http://localhost:3000/";
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  state;

  render() {
    let incomes = [];
    this.state.chart.forEach(item => {
      incomes.push(item.income);
    });
    const thisMonth = {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      datasets: [
        {
          label: "THIS",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: incomes
        }
      ]
    };
    const { Title } = Typography;
    console.log(this.state.chart);
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
            <div>
              <Row>
                <Col span={8}>
                  <Card
                    style={{
                      width: 300,
                      margin: 40,
                      borderRadius: 10,
                      backgroundColor: "#ff6b6b"
                    }}
                  >
                    <p>Today's Income</p>
                    <Title>Rp 1.000.000</Title>
                    <p>+2% Yesterday</p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{
                      width: 300,
                      margin: 40,
                      borderRadius: 10,
                      backgroundColor: "#54a0ff"
                    }}
                  >
                    <p>Orders</p>
                    <Title>3.270</Title>
                    <p>+5% Last Week</p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{
                      width: 300,
                      margin: 40,
                      borderRadius: 10,
                      backgroundColor: "#ff9ff3"
                    }}
                  >
                    <p>This Year's Income</p>
                    <Title>Rp.100.000.000</Title>
                    <p>+10% Last Year</p>
                  </Card>
                </Col>
              </Row>
            </div>
            <div>
              <Card
                title="Revenue"
                extra={
                  <Select
                    defaultValue="month"
                    style={{ width: 120 }}
                    onChange={this.getRevenue}
                  >
                    <Option value="week">Week</Option>
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                  </Select>
                }
                style={{ margin: 40, borderRadius: 10 }}
              >
                <Line data={thisMonth} />
              </Card>
            </div>
            <div>
              <Card
                title="Recent Order"
                extra={
                  <Select
                    defaultValue="month"
                    style={{ width: 120 }}
                    onChange={this.getRecentOrder}
                  >
                    <Option value="week">Week</Option>
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                  </Select>
                }
                style={{ margin: 40, borderRadius: 10 }}
              >
                <Table dataSource={this.state.data}>
                  <Column
                    title="INVOICES"
                    dataIndex="invoices"
                    key="invoices"
                  />
                  <Column title="USER" dataIndex="user" key="user" />
                  <Column title="DATE" dataIndex="date" key="date" />
                  <Column title="ORDERS" dataIndex="orders" key="orders" />
                  <Column title="AMOUNT" dataIndex="amount" key="amount" />
                </Table>
              </Card>
            </div>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default graph;
