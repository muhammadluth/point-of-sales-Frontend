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
  Form,
  Pagination,
  Upload,
  message
} from "antd";
import "../Assets/Header.css";
import ListProduct from "../Component/ListProduct";
import Carts from "../Component/Carts";
import { Link } from "react-router-dom";
import axios from "axios";
import AddProduct from "../Component/AddProduct";
import ConvertRupiah from "rupiah-format";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
function showTotal(total) {
  return `Total ${total} items`;
}
class Bodys extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      cart: [],
      total: 0,
      limit: '6',
      page: '1',
      allPage: []
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };
  handleSubmit(e) {
    console.log(e);
    // alert(e.target)
    e.preventDefault();
    const data = new FormData(e.target);

    fetch("http://localhost:3500/api/v1/product/", {
      method: "POST",
      body: data
    });
    window.location.href = "http://localhost:3000/";
  }

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    this.getAll();
  }

  calculateTotal(price) {
    console.log(this.state.cart);
    this.setState({
      total: this.state.total + price
    });
    this.props.handleCount(this.state.cart.length);
  }

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
  async removeCart(id) {
    let state = [...this.state.cart];
    let index = state.map(el => el.id).indexOf(id);
    if (index !== -1) state.splice(index, 1);
    this.setState({ cart: state });
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
  
  
  page = async () => {
    const { limit, page} = this.state
    await axios
      .get(`http://localhost:3500/api/v1/product?limit=${limit}&${page}`)
      .then(result => {
        console.log(result.data.data);
        let page = []
        this.setState({ data: result.data.data });
        const currentAllpage = Math.ceil(result.data.allData / this.state.limit)

        for(let i=0;i < currentAllpage;i++){
          page.push(i+1)
        }
        this.setState({allPage:page})
      })
      .catch(err => {
        console.log(err);
      });
  };

  pageChange = async (page) => {
    await this.setState({page:page})
    this.getAll()
  }

  SortBy = async value => {
    let sortBy;
    if (value == 1) sortBy = "name";
    if (value == 2) sortBy = "category";
    if (value == 3) sortBy = "price";
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
      <Menu.Item key="1" onClick={() => this.SortBy(1)}>
        By Name
      </Menu.Item>
      <Menu.Item key="2" onClick={() => this.SortBy(2)}>
        By Category
      </Menu.Item>
      <Menu.Item key="3" onClick={() => this.SortBy(3)}>
        By Price
      </Menu.Item>
    </Menu>
  );

  Register = async () => {
    await axios
      .post("http://localhost:3500/api/v1/users/register")
      .then(result => {
        console.log(result.data.data);
        this.setState({ data: result.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  totalPrice() {
    let total = 0
    this.state.cart.forEach((val,key) => {
      total += val.price
    })
    return (<b>{ConvertRupiah.convert(total)}</b>)
  }

  cancel = (e) => {
    e.preventDefault()
    if(window.confirm('BACOT'))
    {
      this.setState({
        cart:[]
      })
    }
  }

  render() {
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
              <Dropdown overlay={this.menu}>
                <Button>
                  Filter
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </div>
          </Col>
          <Col span={10}>
            <div style={{ textAlign: "left" }}>
              <Button type="primary" onClick={this.showModal}>
                <Icon type="plus" /> Add Product
              </Button>
              <Modal
                title="Add Product"
                visible={visible}
                onSubmit={this.handleSubmit}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
              >
                <Form {...formItemLayout}>
                  <Form.Item label="Name" hasFeedback validateStatus="success">
                    <Input placeholder="I'm the content" name="name" />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    hasFeedback
                    validateStatus="success"
                  >
                    <Input placeholder="I'm the content" name="category" />
                  </Form.Item>
                  <Form.Item
                    label="Upload Image">
                  <Upload {...props}>
                  <Button>
                   <Icon type="upload"/> Click to Upload
                  </Button>
                 </Upload>
                 </Form.Item>

                  <Form.Item
                    label="Category"
                    hasFeedback
                    validateStatus="success"
                  >
                    <Select defaultValue="1">
                      <Option value="1">9</Option>
                      <Option value="2">10</Option>
                      <Option value="3">11</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Price" hasFeedback validateStatus="success">
                    <Input placeholder="I'm the content" name="price" />
                  </Form.Item>
                  <Form.Item label="Quantity" hasFeedback validateStatus="success">
                    <Input placeholder="I'm the content" name="price" />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </Col>
          <Col span={12}>
            <Search
              placeholder="input search text"
              onSearch={value => this.Search(value)}
              enterButton
              style={{
                textAlign: "right",
                marginLeft: "55px",
                width: 220
              }}
            />
          </Col>
          <Col span={18}>
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
            {/* <Pagination>
              {
                this.state.allPage.map(item => (
                  <PaginationItem key={item}>
                    <PaginationLink onClick={() => this.pageChange(item)}>
                      {item}

                    </PaginationLink>
                  </PaginationItem>
                ))
              }
            </Pagination> */}
            {/* <Pagination size="small" total={this.page} /> */}
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
              <Text>TOTAL : {ConvertRupiah.convert(this.state.total)}</Text>
              <p>*Belum termasuk PPN</p>
              <Button type="primary" block onClick={this.showModal}>
                CHECKOUT
              </Button>
              <Modal
                title="Basic Modal"
                visible={this.state.visibleC}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
              <Button type="danger" block style={{ marginTop: "5px" }} onClick={this.cancel}>
                CANCEL
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default Bodys;
