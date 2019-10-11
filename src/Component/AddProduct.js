import React, { Component } from "react";
import {
  Table,
  Icon,
  Layout,
  Menu,
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Input,
  Form,
  Select,
  Modal
} from "antd";
import "../Assets/Header.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMenu } from "../Public/Redux/Actions/Menu";
import Axios from "axios";

const { Column } = Table;

const { Header, Sider } = Layout;

class AddProduct extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      name: "",
      description: "",
      image: "",
      category: "",
      price: "",
      qty: "",
      limit: "6",
      page: "1",
      allPage: [],
      visible: false,
      collapsed: false,
      count: 0
    };
    // this.calculateTotal = this.calculateTotal.bind(this);
    // this.handleCart = this.handleCart.bind(this);
  }
  componentDidMount() {
    this.fetchData();
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
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  setName(e) {
    let value = e.target.value;
    this.setState({ name: value });
  }
  setDescription(e) {
    let value = e.target.value;
    this.setState({ description: value });
  }
  setImage(e) {
    let value = e.target.value;
    this.setState({ image: value });
  }
  setCategory(e) {
    let value = e.target.value;
    this.setState({ category: value });
  }
  setPrice(e) {
    let value = e.target.value;
    this.setState({ price: value });
  }
  setQty(e) {
    let value = e.target.value;
    this.setState({ qty: value });
  }

  handleAddProduct = () => {
    const { name, description, image, category, price, qty } = {
      ...this.state
    };

    console.log(name, description, image, category, price, qty);
    Axios.post(
      "http://localhost:3500/api/v1/product/",
      {
        name: name,
        description: description,
        image: image,
        category_id: category,
        price: price,
        qty: qty
      }
      // {
      //   headers: {
      //     Authorization: localStorage.getItem("token")
      //   }
      // }
    ).then(res => {
      console.log(res);
      // window.location.href = "/adddata";
    });
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
    const { visible, confirmLoading, ModalText } = this.state;
    console.log(this.state);
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
            <div style={{ height: "100%" }}>
              <div style={{ textAlign: "left" }}>
                <Button type="primary" onClick={this.showModal}>
                  <Icon type="plus" /> Add Product
                </Button>
                <Modal
                  title="Add Product"
                  visible={visible}
                  onOk={this.handleAddProduct}
                  onCancel={this.handleCancel}
                >
                  <Form onSubmit={this.handleAddProduct.bind(this)}>
                    <Form.Item
                      label="Name"
                      hasFeedback
                      validateStatus="success"
                    >
                      <Input
                        id="name"
                        placeholder="I'm the content"
                        name="name"
                        onChange={e => this.setName(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      hasFeedback
                      validateStatus="success"
                    >
                      <Input
                        placeholder="I'm the content"
                        name="description"
                        onChange={e => this.setDescription(e)}
                      />
                    </Form.Item>
                    <Form.Item label="Upload Image">
                      <Input
                        name="image"
                        type="file"
                        onChange={e => this.setImage(e)}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Category"
                      hasFeedback
                      validateStatus="success"
                    >
                      <Input
                        type="select"
                        onChange={e => this.setCategory(e)}
                      ></Input>
                    </Form.Item>
                    <Form.Item
                      label="Price"
                      hasFeedback
                      validateStatus="success"
                    >
                      <Input
                        placeholder="I'm the content"
                        name="price"
                        onChange={e => this.setPrice(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Quantity"
                      hasFeedback
                      validateStatus="success"
                    >
                      <Input
                        placeholder="I'm the content"
                        name="qty"
                        onChange={e => this.setQty(e)}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
              <div>
                <Table dataSource={this.state.data}>
                  <Column title="ID" dataIndex="id" key={this.state.id} />
                  <Column title="Product" dataIndex="name" key="" />
                  <Column
                    title="Description"
                    dataIndex="description"
                    key="description"
                  />
                  <Column title="Image" dataIndex="image" key="image" />
                  <Column
                    title="Category"
                    dataIndex="category"
                    key="category"
                  />
                  <Column title="Price" dataIndex="price" key="price" />
                  <Column title="Quantity" dataIndex="qty" key="qty" />
                  <Column
                    title="Create At"
                    dataIndex="created_at"
                    key="created_at"
                  />
                  <Column
                    title="Update At"
                    dataIndex="update_at"
                    key="update_at"
                  />
                  <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                      <span>
                        <a>
                          <Icon type="edit" />
                        </a>

                        <Divider type="vertical" />
                        <a>
                          <Icon type="delete" style={{ color: "red" }} />
                        </a>
                      </span>
                    )}
                  />
                </Table>
              </div>
            </div>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.menuList
  };
};

export default connect(mapStateToProps)(AddProduct);
