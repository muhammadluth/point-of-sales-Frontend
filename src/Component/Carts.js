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
import "../Assets/style.css";
import ConvertRupiah from "rupiah-format";
import Http from "../Public/Utils/Http";

const { Text } = Typography;
const { Column } = Table;

class Carts extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      cart: [],
      visible: false,
      total: 0
    };
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
      Http.post(
        `/api/v1/order/`,
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
              src={`${process.env.REACT_APP_API_BASEURL}/` + item.image}
              style={{ width: "100%", height: "100%" }}
            />
            <h4 style={{ marginTop: "5px" }}>{item.category}</h4>
            <h3 style={{ marginTop: "10px" }}>
              Price :{ConvertRupiah.convert(item.price * item.qty)}
            </h3>
            <Button.Group size="small">
              <Button
                type="primary"
                href="#"
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
                href="#"
                onClick={() =>
                  item.qty >= item.quantity ? this.false : (item.qty += 1)
                }
              >
                <Icon type="plus" />
              </Button>
            </Button.Group>
            <Button
              className="btn-remove-cart"
              size="default"
              type="danger"
              onClick={this.props.removeCart}
            >
              <Icon type="delete" />
            </Button>
          </Card>
        ))}
        <div style={{ bottom: 0 }}>
          <Text>
            TOTAL :
            {ConvertRupiah.convert(
              cart.reduce((a, c) => a + c.price * c.qty, 0)
            )}
          </Text>
          <p>*Belum termasuk PPN</p>
          <Button type="primary" block onClick={this.showCheckout}>
            CHECKOUT
          </Button>
          <Button
            type="danger"
            block
            style={{ marginTop: "5px" }}
            onClick={this.props.cancel}
          >
            CANCEL
          </Button>
        </div>
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
