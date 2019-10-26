import React, { Component } from "react";
import {
  Button,
  Icon,
  Row,
  Col,
  Card,
  Modal,
  Badge,
  Typography,
  Table,
  Input,
  Form
} from "antd";
import "../Assets/Header.css";
import ConvertRupiah from "rupiah-format";
import Axios from "axios";

const { Text } = Typography;
const { Column } = Table;

class Carts extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      cart: [],
      visible: false,
      total: 0,
      name: ""
    };
    // this.addCart = this.addCart.bind(this);
    // this.calculateTotal = this.calculateTotal.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  showCheckout = () => {
    this.setState({
      visible: true
    });
  };

  modalCheckout = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  modalCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  setName(e) {
    let value = e.target.value;
    this.setState({ name: value });
  }
  setQty(e) {
    let value = e.target.value;
    this.setState({ qty: value });
  }
  setPrice(e) {
    let value = e.target.value;
    this.setState({ price: value });
  }
  setTotal(e) {
    let value = e.target.value;
    this.setState({ total: value });
  }

  handleCheckOut() {
    let cashier = localStorage.getItem("user");
    console.log(cashier);
    let receipt = Math.floor(Math.random() * 100000);
    console.log(receipt);
    this.props.cart.map((item, index) => {
      console.log(item);
      Axios.post(
        "http://localhost:3500/api/v1/history/",
        {
          invoices: receipt,
          user: cashier,
          orders: item.name,
          amount: item.price * item.qty
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      ).then(res => {
        console.log(res);
        console.log(item);
        window.location.href = "/dashboard";
      });
    });
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {

  //     quantity: 1,
  //     id: this.props.id,
  //     name: this.props.name,
  //     description: this.props.description,
  //     price: this.props.price,
  //     image: this.props.image
  //   };
  //   this.removeCart = this.removeCart.bind(this);
  //   this.addCart = this.addCart.bind(this);
  //   this.reduceQuantity = this.reduceQuantity.bind(this);
  // }

  // async addCart() {
  //   if (this.state.quantity > 0) {
  //     await this.setState({
  //       id: this.props.id,
  //       qty: this.state.quantity + 1,
  //       name: this.props.name,
  //       description: this.props.description,
  //       price: this.props.price,
  //       image: this.props.image
  //     });
  //   } else {
  //     await this.setState({
  //       qty: 1,
  //       id: this.props.id,
  //       name: this.props.name,
  //       price: this.props.price,
  //       image: this.props.image
  //     });
  //   }
  //   await this.props.handleTotal(this.state.price);
  //   await this.props.handleCart(this.state);
  // }

  // async reduceQuantity() {
  //   await this.setState({
  //     id: this.props.id,
  //     qty: this.state.quantity - 1,
  //     name: this.props.name,
  //     description: this.props.description,
  //     price: this.props.price,
  //     image: this.props.image
  //   });
  //   await this.props.handleTotal(-this.state.price);
  //   await this.props.handleCart(this.state);
  // }

  // async removeCart() {
  //   await this.setState({
  //     qty: 0,
  //     id: this.props.id,
  //     name: this.props.name,
  //     description: this.props.description,
  //     price: this.props.price,
  //     image: this.props.image
  //   });
  //   await this.props.handleRemove(this.props.id);
  // }

  render() {
    const { cart } = this.props;
    console.log(cart);
    let cashier = localStorage.getItem("user");
    console.log(cashier);
    let receipt = Math.floor(Math.random() * 100000);
    console.log(receipt);
    return (
      <div>
        {cart.map(item => (
          <Card title={item.name}>
            <img
              src={`http://localhost:3500/` + item.image}
              style={{ width: "100%", height: "100%" }}
            />
            <h4 style={{ marginTop: "5px" }}>{item.category}</h4>
            <h3 style={{ marginTop: "10px" }}>
              Price :{ConvertRupiah.convert(item.price * item.qty)}
            </h3>
            <Button.Group size="small">
              <Button
                type="primary"
                onClick={() => (item.qty <= 0 ? this.false : (item.qty -= 1))}
                disabled={this.state.quantity < 1}
              >
                <Icon type="minus" />
              </Button>
              <span
                style={{
                  marginRight: "5px",
                  marginLeft: "5px",
                  fontSize: "20px",
                  fontWeight: 900
                }}
              >
                {item.qty}
              </span>
              <Button
                type="primary"
                onClick={() =>
                  item.qty >= item.qty ? this.false : (item.qty += 1)
                }
              >
                <Icon type="plus" />
              </Button>
            </Button.Group>
            {/* <Button type="primary" onClick={this.removeCart}>
                <Icon type="p" />
            </Button> */}
          </Card>
        ))}
        <Text>
          TOTAL :
          {ConvertRupiah.convert(cart.reduce((a, c) => a + c.price * c.qty, 0))}
        </Text>
        <p>*Belum termasuk PPN</p>
        <Button type="primary" block onClick={this.showCheckout}>
          CHECKOUT
        </Button>
        <Modal
          title="CHECKOUT"
          visible={this.state.visible}
          onOk={() => this.handleCheckOut()}
          onCancel={this.modalCancel}
        >
          <div>
            <Table dataSource={cart} pagination={{ position: "none" }}>
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Quantity" dataIndex="qty" key="qty" />
              <Column title="Price" dataIndex="price" key="price" />
            </Table>
            <div>
              <Row>
                <Col span={18}>
                  <Text style={{ marginLeft: "20px" }}>Total</Text>
                </Col>
                <Col span={6}>
                  {ConvertRupiah.convert(
                    cart.reduce((a, c) => a + c.price * c.qty, 0)
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Carts;
