import React, { Component } from "react";
import {
  Badge,
  Select,
  Layout,
  Button,
  Row,
  Col,
  Input,
  Pagination
} from "antd";
import "../Assets/Header.css";
import "../Component/ListProduct";
import Carts from "../Component/Carts";
import ConvertRupiah from "rupiah-format";
import ListProduct from "../Component/ListProduct";
import { connect } from "react-redux";
import { getMenu } from "../Public/Redux/Actions/Menu";

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
      limit: "3",
      page: "1",
      allPage: [],
      visible: false
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }
  showCheckout = () => {
    this.setState({
      visible: true
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  setCount = count => {
    this.setState({
      count: count
    });
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  calculateTotal(price) {
    console.log(this.state.cart);
    this.setState({
      total: this.state.total + price
    });
    this.state.handleCount(this.state.cart.length);
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
    let state = [...this.state.cart];
    let index = state.map(el => el.id).indexOf(id);
    if (index !== -1) state.splice(index, 1);
    this.setState({ cart: state });
  }

  async fetchData() {
    await this.props.dispatch(
      getMenu({
        search: this.state.search,
        sort: this.state.sort
      })
    );
    console.log(this.props.data.menuList);
    this.setState({ data: this.props.data.menuList });
  }

  // page = async () => {
  //   const { limit, page } = this.state;
  //   await axios
  //     .get(`http://localhost:3500/api/v1/product?limit=${limit}&${page}`)
  //     .then(result => {
  //       console.log(result.data.data);
  //       let page = [];
  //       this.setState({ data: result.data.data });
  //       const currentAllpage = Math.ceil(
  //         result.data.allData / this.state.limit
  //       );

  //       for (let i = 0; i < currentAllpage; i++) {
  //         page.push(i + 1);
  //       }
  //       this.setState({ allPage: page });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // pageChange = async page => {
  //   await this.setState({ page: page });
  //   this.getAll();
  // };

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

  totalPrice() {
    let total = 0;
    this.state.cart.forEach((val, key) => {
      total += val.price;
    });
    return <b>{ConvertRupiah.convert(total)}</b>;
  }

  cancel = e => {
    e.preventDefault();
    if (window.confirm("Canceled")) {
      this.setState({
        cart: []
      });
    }
  };

  render() {
    console.log(this.state.cart);
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <Content
        style={{
          margin: "4px 4px",
          background: "#fff",
          minHeight: 1000
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
                <Option value="created_at">Latest</Option>
              </Select>
            </div>
          </Col>

          <Col span={22}>
            <Search
              placeholder="input search text"
              onChange={event => this.getSearch(event)}
              enterButton
              style={{
                textAlign: "right",
                marginLeft: "50%",
                width: 220
              }}
            />
          </Col>
          <Col span={18}>
            <Row>
              <ListProduct
                product={this.state.data}
                handleCart={this.handleCart}
              />
            </Row>
            <Pagination
              style={{ textAlign: "center" }}
              size="small"
              total={this.state.page}
              onClick={() => this.pageChange(this.page.bind(this))}
            />
          </Col>

          <Col span={6}>
            <p
              style={{
                fontSize: "30px",
                textAlign: "center",
                fontWeight: 900,
                color: "#000"
              }}
            >
              CARTS
              <Badge
                count={this.state.qty}
                showZero
                style={{ fontSize: "20px", color: "#000" }}
              ></Badge>
            </p>
            <Row>
              <Carts cart={this.state.cart} />
            </Row>

            <div>
              <Button
                type="danger"
                block
                style={{ marginTop: "5px" }}
                onClick={this.cancel}
              >
                CANCEL
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.menuList
  };
};

export default connect(mapStateToProps)(Bodys);
