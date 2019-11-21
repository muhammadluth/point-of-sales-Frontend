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
import "../Assets/style.css";
import Http from "../Public/Utils/Http";
import ConvertRupiah from "rupiah-format";
import Navigation from "../Component/Navigation";
import Header from "../Component/Header";

const { Option } = Select;
const { Column } = Table;
const { Title, Text } = Typography;

export default class History extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      order: [],
      count: 0,
      orders: 0,
      growth: 0,
      resYearIncome: 0,
      recentOrder: [],
      growthOrdeWeek: 0,
      yearCount: 0,
      detalProduct: []
    };
    this.getRecentOrder = this.getRecentOrder.bind(this);
  }
  componentDidMount() {
    this.getCountOrder();
    this.getRecentOrder();
    this.getRevenue();
  }

  // Card
  getCountOrder = async () => {
    await Http.get(`/api/v1/order/allorder`)
      .then(result => {
        let growthCount =
          ((result.data.data[0].daynow - result.data.data[0].yesterday) /
            result.data.data[0].yesterday) *
          100;
        let gowCount =
          ((result.data.data[0].weeknow - result.data.data[0].lastweek) /
            result.data.data[0].lastweek) *
          100;
        let yearCount =
          ((result.data.data[0].yearnow - result.data.data[0].yearlast) /
            result.data.data[0].yearlast) *
          100;
        this.setState({
          count: result.data.data[0].daynow,
          orders: result.data.data[0].dayordernnow,
          resYearIncome: result.data.data[0].yearnow,
          growth: growthCount.toFixed(1),
          growthOrdeWeek: gowCount.toFixed(1),
          yearCount: yearCount.toFixed(1)
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // grafik
  getRevenue = async event => {
    let data = event;
    Http.get(`/api/v1/order/revenue?order=${data}`)
      .then(result => {
        this.setState({
          data: result.data.data,
          order: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // show recent order
  getRecentOrder = async event => {
    let data = event;
    await Http.get(`/api/v1/order/recent?order=${data}`)
      .then(result => {
        this.setState({
          recentOrder: result.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.data);
    if (this.state.count === null) {
      this.state.count = 0;
    }
    // let incomes = [];
    // this.state.chart.forEach(item => {
    //   incomes.push(item.amountcount);
    // });
    let amCount = [];
    this.state.data.forEach(item => {
      amCount.push(item.amountcount);
    });
    // get day
    let day = [];
    this.state.data.forEach(days => {
      day.push(days.dayname);
    });

    let month = [];
    this.state.data.forEach(moon => {
      month.push(moon.monthname);
    });

    let years = [];
    this.state.data.forEach(year => {
      years.push(year.year);
    });

    let date = [];
    if (this.state.order === "week") {
      date.push(day);
    } else if (this.state.order === "month") {
      date.push(month);
    } else {
      date.push(years);
    }
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
          label: "THIS" + this.state.order,
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
          data: amCount
        }
      ]
    };
    const { Title } = Typography;
    console.log(this.state.data);
    return (
      <Layout className="layout">
        <Navigation />
        <Layout>
          <Header />
          <div>
            <Row>
              <Col span={8}>
                <Card
                  style={{
                    width: 300,
                    margin: 40,
                    borderRadius: 10,
                    backgroundColor: "#ff6b6b",
                    paddingTop: 2
                  }}
                >
                  <p>Today's Income</p>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: "#000"
                    }}
                  >
                    {ConvertRupiah.convert(this.state.count)}
                  </Text>
                  <p style={{ paddingTop: 20 }}>
                    {this.state.growth}% Yesterday
                  </p>
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
                  <Title>{this.state.orders}</Title>
                  <p>{this.state.growthOrdeWeek}% Last Week</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{
                    width: 300,
                    margin: 40,
                    borderRadius: 10,
                    backgroundColor: "#ff9ff3",
                    paddingTop: 2
                  }}
                >
                  <p>This Year's Income</p>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: "#000"
                    }}
                  >
                    {ConvertRupiah.convert(this.state.resYearIncome)}
                  </Text>
                  <p style={{ paddingTop: 23 }}>
                    {this.state.yearCount}% Last Year
                  </p>
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
                  <Option value="Week">Week</Option>
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
                  defaultValue="week"
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
              <Table dataSource={this.state.recentOrder}>
                <Column title="INVOICES" dataIndex="invoices" key="invoices" />
                <Column title="USER" dataIndex="user" key="user" />
                <Column title="DATE" dataIndex="datenow" key="date" />
                <Column title="ORDERS" dataIndex="orders" key="orders" />
                <Column title="AMOUNT" dataIndex="amount" key="amount" />
              </Table>
            </Card>
          </div>
        </Layout>
      </Layout>
    );
  }
}
