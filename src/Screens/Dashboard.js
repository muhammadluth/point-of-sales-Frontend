import React, { Component } from "react";
import {
  Badge,
  Select,
  Layout,
  Button,
  Row,
  Col,
  Input,
  Pagination,
  Typography,
  Alert,
  Spin
} from "antd";
import "../Component/ListProduct";
import Carts from "../Component/Carts";
import ConvertRupiah from "rupiah-format";
import ListProduct from "../Component/ListProduct";
import { connect } from "react-redux";
import { getMenu } from "../Public/Redux/Actions/Menu";
import "../Assets/style.css";
import Navigation from "../Component/Navigation";
import Header from "../Component/Header";
import Http from "../Public/Utils/Http";
const { Text } = Typography;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

class Bodys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cart: [],
      search: "",
      sort: "",
      total: 0,
      limit: "6",
      page: "1",
      allPage: [],
      sortdesc: "",
      loading: true
    };
    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleCart(event, result) {
    this.setState(state => {
      const cart = state.cart;
      let inCart = false;
      cart.forEach(item => {
        if (item.id === result.id) {
          inCart = true;
          item.qty += 1;
        }
      });
      if (!inCart) {
        cart.push({ ...result, qty: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    });
  }
  async removeCart(id) {
    let remove = [...this.state.cart];
    let index = remove.map(el => el.id).indexOf(id);
    if (index !== -1) remove.splice(index, 1);
    await this.setState({ cart: remove });
  }

  async fetchData() {
    await this.props.dispatch(
      getMenu({
        search: this.state.search,
        sort: this.state.sort
      })
    );
    console.log(this.props.data.menuList);
    this.setState({ data: this.props.data.menuList, loading: false });
  }

  getPage = async value => {
    let page = value;
    await this.setState({ page });
    return this.fetchData(page);
  };
  getSearch = async event => {
    let search = event.target.value;
    console.log(search);
    await this.setState({ search });
    return this.fetchData(search, this.state.sort);
  };

  getSort = async value => {
    let sort = value;
    await this.setState({ sort });
    return this.fetchData(sort, this.state.search);
  };
  cancel = e => {
    e.preventDefault();
    if (window.confirm("Canceled")) {
      this.setState({
        cart: []
      });
    }
  };

  render() {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = "/";
    } else {
      return (
        <Layout className="layout">
          <Navigation />
          <Layout
            style={{
              background: "#fff",
              height: "100%"
            }}
          >
            <Header />
            <Content
              style={{
                margin: "4px 4px",
                background: "#fff",
                height: "100%"
              }}
            >
              <Row>
                <Col span={2}>
                  <div style={{ textAlign: "left", marginLeft: "10px" }}>
                    <Select
                      defaultValue="name"
                      style={{ width: 120 }}
                      onChange={this.getSort}
                    >
                      <Option value="name">Name</Option>
                      <Option value="price">Price</Option>
                      <Option value="category">Category</Option>
                    </Select>
                  </div>
                </Col>

                <Col span={16}>
                  <div style={{ textAlign: "right", marginRight: 10 }}>
                    <Search
                      placeholder="Food Gathering"
                      onChange={event => this.getSearch(event)}
                      enterButton
                      style={{
                        textAlign: "left",
                        width: 220
                      }}
                    />
                  </div>
                </Col>
                <Col span={18}>
                  <Row>
                    {this.state.loading ? (
                      <div>
                        <Spin tip="Loading...">
                          <Alert
                            message="Loadig Data"
                            description="Please wait to loading data"
                            type="info"
                          />
                        </Spin>
                      </div>
                    ) : (
                      <div>
                        <ListProduct
                          product={this.state.data}
                          handleCart={this.handleCart}
                        />
                      </div>
                    )}
                  </Row>
                </Col>

                <Col span={6}>
                  <div style={{ textAlign: "center" }}>
                    <Text className="titleCard">
                      CARTS
                      <Badge
                        count={this.state.qty}
                        showZero
                        style={{ fontSize: "20px", backgroundColor: "#000" }}
                      ></Badge>
                    </Text>
                  </div>
                  <Row>
                    <Carts
                      cart={this.state.cart}
                      cancel={this.cancel}
                      removeCart={this.removeCart}
                    />
                  </Row>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state.menuList
  };
};

export default connect(mapStateToProps)(Bodys);
