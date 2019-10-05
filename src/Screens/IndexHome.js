import React, { Component } from "react";
import {
  Dropdown,
  Badge,
  Icon,
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Input,
  Select,
  Typography,
  Modal,
} from "antd";
import "../Assets/Header.css";
import ListProduct from "../Component/ListProduct";
import Carts from "../Component/Carts";
import { Link } from "react-router-dom";
import axios from "axios";
import { thisExpression } from "@babel/types";



const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

class IndexHome extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      cart: [],
      total: 0
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  state;

  componentDidMount() {
    this.getAll();
  }

  calculateTotal(price) {
    console.log(this.state.cart);
    this.setState({
      total: this.state.total + price
    });
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCart(result) {
    this.setState(state => {
      const cart = state.cart;
      let inCart = false;
      cart.forEach(item => {
        if (item.name === result.name) {
          inCart = true;
          item.qty += 1;
        }
      });
      if (!inCart) {
        cart.push({ ...result, qty: 1 });
      }
      return cart;
    });
  }
  removeCart(id) {
    let state = {...this.state.cart}
    let index = state.map(el => el.id).indexOf(id)
    if(index !== -1) state.splice(index,1)
    this.setState({cart: state})

  }

  getAll = async () => {
    await axios
      .get("http://localhost:3500/api/v1/product/")
      .then(result => {
        console.log(result.data.data);
        this.setState({ data: result.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  SortBy = async value => {
    let sortBy
    if(value == 1) sortBy = "name"
    if(value == 2) sortBy = "category"
    if(value == 3) sortBy = "price"
    await axios
      .get("http://localhost:3500/api/v1/product?sort=" + sortBy)
      .then(result => {
        console.log(result.data.data);
        this.setState({ data: result.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  Search = async value => {
    await axios
      .get("http://localhost:3500/api/v1/product?search=" + value)
      .then(result => {
        console.log(result.data.data);
        this.setState({ data: result.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

    menu = (
    <Menu>
      <Menu.Item key="1" onClick={()=>this.SortBy(1)}>By Name</Menu.Item>
      <Menu.Item key="2" onClick={()=>this.SortBy(2)}>By Category</Menu.Item>
      <Menu.Item key="3" onClick={()=>this.SortBy(3)}>By Price</Menu.Item>
    </Menu>
  );
  // onChange = (e) => {
  //   e.preventDefault()
  //   let sort = e.target.value;
  //   this.SortBy(sort);
  // };
  // addCart(data) {
  //   const Cart = [...this.state.cart,data]
  //   this.setState({
  //     cart
  //   })
  // }

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
                <span>Home</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="history" />
                <span>History</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.showModal}>
                <Icon type="plus" />
                <Modal
                  title="Basic Modal"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  {"/post"}
                </Modal>
                <span>Add</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span>
                  <Link to={"/SignIn"} style={{ color: "#fff" }}>
                    SignIn or SignUp
                  </Link>
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{ background: "#001529", padding: 0, textAlign: "right" }}
            >
              <Row>
                <Col span={18}>
                  <Search
                    placeholder="input search text"
                    onSearch={value => this.Search(value)}
                    enterButton
                    style={{
                      paddingTop: "15px",
                      width: 220
                    }}
                  />
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
                    <Badge count={0} showZero style={{ fontSize: "20px" }}>
                      <a href="#" className="head-example" />
                    </Badge>
                  </p>
                </Col>
              </Row>
            </Header>

            <Content
              style={{
                margin: "4px 4px",
                background: "#fff",
                minHeight: 1000
              }}
            >
              <Row>
                <Col span={18}>
                  <div>
                    <Dropdown overlay={this.menu}>
                      <Button>
                        Filter<Icon type="down" />
                      </Button>
                    </Dropdown>
                  </div>

                  {/* <Button type="primary" onClick={() => this.SortBy("name")}>
                    SortBy Name
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => this.SortBy("category")}
                  >
                    SortBy Category
                  </Button>
                  <Button type="primary" onClick={() => this.SortBy("price")}>
                    SortBy Price
                  </Button> */}
                  <Row>
                    {/* products */}
                    {this.state.data.map((item, index) => {
                      return (
                        <Col span={8} style={{ padding: "8px" }}>
                          <ListProduct
                            key={index}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            handleCart={this.handleCart}
                            handleTotal={this.calculateTotal}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </Col>

                <Col span={6}>
                  {/* products */}
                  {this.state.cart.map((item, index) => {
                    return (
                      <Col span={24} style={{ padding: "8px" }}>
                        <Carts
                          key={index}
                          id={item.id}
                          name={item.name}
                          category={item.category}
                          description={item.description}
                          price={item.price}
                          image={item.image}
                          handleCart={this.handleCart}
                          handleTotal={this.calculateTotal}
                          handleRemove={this.removeCart}
                        />
                      </Col>
                    );
                  })}
                  <div>
                  <Text>TOTAL</Text>
                  <p>*Belum termasuk PPN</p>
                  <Button type="primary" block>
                    CHECKOUT
                  </Button>
                  <Button type="danger" block style={{marginTop: '5px'}}>
                    CANCEL
                  </Button>
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default IndexHome;
