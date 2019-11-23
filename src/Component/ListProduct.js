import React, { Component } from "react";
import { Card, Icon, Avatar, Col, Button, Row } from "antd";
import ConvertRupiah from "rupiah-format";
import Carts from "./Carts";

const { Meta } = Card;

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      name: "",
      description: "",
      image: "",
      category_id: "",
      price: "",
      qty: ""
    };
  }

  render() {
    console.log(this.props);
    const ListProduct = this.props.product.map(item => (
      <Col span={8} style={{ padding: "8px" }}>
        <Card
          loading={this.props.loading}
          style={{ width: "100%", height: "100%" }}
          cover={
            <img
              alt="example"
              src={`${process.env.REACT_APP_API_BASEURL}/` + item.image}
              style={{ width: "100%", height: "150px" }}
            />
          }
          actions={[
            <Button
              type="primary"
              onClick={e => this.props.handleCart(e, item)}
            >
              ADD to CART
            </Button>
          ]}
        >
          <Meta
            title={item.name}
            description={ConvertRupiah.convert(item.price)}
          />
        </Card>
      </Col>
    ));
    return <div>{ListProduct}</div>;
  }
}

export default ListProduct;
