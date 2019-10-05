import React, { Component } from "react";
import { Button,Icon, Row, Col, Card, Modal, Badge } from "antd";
import "../Assets/Header.css";
import ConvertRupiah from "rupiah-format";
import Header from "antd/lib/calendar/Header";

class Carts extends Component {
  state = { visible: false };

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

  constructor(props) {
    super(props);
    this.state = {
      
      quantity: 1,
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      image: this.props.image
    };
    this.removeCart = this.removeCart.bind(this);
    this.addCart = this.addCart.bind(this);
    this.reduceQuantity = this.reduceQuantity.bind(this);
  }

  async addCart() {
    if (this.state.quantity > 0) {
      await this.setState({
        id: this.props.id,
        qty: this.state.quantity + 1,
        name: this.props.name,
        description: this.props.description,
        price: this.props.price,
        image: this.props.image
      });
    } else {
      await this.setState({
        qty: 1,
        id: this.props.id,
        name: this.props.name,
        price: this.props.price,
        image: this.props.image
      });
    }
    await this.props.handleTotal(this.state.price);
    await this.props.handleCart(this.state);
  }

  async reduceQuantity() {
    await this.setState({
      id: this.props.id,
      qty: this.state.quantity - 1,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      image: this.props.image
    });
    await this.props.handleTotal(-this.state.price);
    await this.props.handleCart(this.state);
  }

  async removeCart() {
    await this.setState({
      qty: 0,
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      image: this.props.image
    });
    await this.props.handleRemove(this.props.id);
  }

  render() {
    return (
      <div>
        {
          <Card
            title={this.props.name}
            extra={
              <Button type="primary" onClick={this.showModal}>
                Details
              </Button>
            }
          >
            <Modal
              title="Descriptions"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {this.props.description}
            </Modal>
            <img
              src={`http://localhost:3500/` + this.props.image}
              style={{ width: "100%", height: "100%" }}
            />
            <h4 style={{ marginTop: "5px" }}>{this.props.category}</h4>
            <h3 style={{ marginTop: "10px" }}>Price : {ConvertRupiah.convert(this.props.price)}</h3>
            <Button.Group size='small'>
              <Button type="primary" onClick={() => this.setState({ quantity: this.state.quantity - 1 })}  disabled={this.state.quantity < 1}> 
                <Icon type="minus" />
              </Button>
              <span style={{marginRight:'5px',marginLeft:'5px',fontSize: '20px',fontWeight: 900}}>{this.state.quantity}</span>
              <Button type="primary" onClick={() => this.setState({ quantity: this.state.quantity + 1 })}>
                <Icon type="plus" />
              </Button>
            </Button.Group>
            {/* <Button type="primary" onClick={this.removeCart}>
                <Icon type="p" />
            </Button> */}
          </Card>
        }
        
      </div>
    );
  }
}

export default Carts;
