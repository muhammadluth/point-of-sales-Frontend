import React, { Component } from "react";
import { Card, Icon, Avatar, Col, Button } from "antd";
import ConvertRupiah from "rupiah-format";
import Carts from "./Carts";

const { Meta } = Card;

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: 0,
      image: "",
      description: "",
      qty: 0,
    }
    this.addCart = this.addCart.bind(this)
  }

  async addCart(){
    if (this.state.qty > 0){
      this.state.qty +=1
    }else{
      await this.setState({
        qty: 1,
        id: this.props.id,
        name: this.props.name,
        category: this.props.category,
        description: this.props.description,
        price: this.props.price,
        image: this.props.image
      })
      console.log(this.state)
    }
    await this.props.handleCart(this.state)
    this.props.handleTotal(this.props.price)
  }
  render() {
    return (
      <Card
        style={{ width: "100%", height: "100%" }}
        cover={
          <img
            alt="example"
            src={"http://localhost:3500/" + this.props.image}
            style={{ width: "100%", height: "100%" }}
          />
        }
        actions={[
          <Button type="primary"
          onClick={(e) => this.addCart()}>
            ADD to CART
          </Button>
        ]}>
        <Meta
          title={this.props.name}
          description={ConvertRupiah.convert(this.props.price)}
        />
      </Card>
    );
  }
}

export default ListProduct;
