import React, { Component } from "react";
import { Drawer, Button, Form, Input, Select } from "antd";
import Http from "../Public/Utils/Http";
const { Option } = Select;

export default class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      name: "",
      description: "",
      image: "",
      category: "",
      price: "",
      qty: ""
    };
  }
  setName(e) {
    let value = e.target.value;
    this.setState({ name: value });
  }
  setDescription(e) {
    let value = e.target.value;
    this.setState({ description: value });
  }
  setImage(e) {
    let value = e.target.files[0];
    this.setState({ image: value });
  }
  setCategory(e) {
    this.state.category = e.target.value;
    this.setState({ category: this.state.category });
  }
  setSelectCategory = async value => {
    let category = value;
    await this.setState({ category: value });
  };
  setPrice(e) {
    let value = e.target.value;
    this.setState({ price: value });
  }
  setQty(e) {
    let value = e.target.value;
    this.setState({ qty: value });
  }
  handleEditProduct = DataUpdate => {
    let id = DataUpdate;
    const { name, description, image, category, price, qty } = {
      ...this.state
    };

    const pd = new FormData();
    pd.append("name", name);
    pd.append("description", description);
    pd.append("image", image);
    pd.append("category_id", category);
    pd.append("price", price);
    pd.append("qty", qty);

    console.log(pd);
    Http.put(`/api/v1/product/${id}`, pd, {
      headers: {
        authorization: `${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        console.log(res);
        window.location.href = "/manage";
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    const { DataUpdate, DataTable } = this.props;
    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          key={DataTable.id}
          width={520}
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <Form onSubmit={this.handleEditProduct.bind(this)}>
            {DataTable.filter(item => item.id === DataUpdate).map(item => (
              <div>
                <Form.Item label="Name" hasFeedback validateStatus="success">
                  <Input
                    id="name"
                    name="name"
                    placeholder={item.name}
                    onChange={e => this.setName(e)}
                  />
                </Form.Item>
                <Form.Item
                  label="Description"
                  hasFeedback
                  validateStatus="success"
                >
                  <Input
                    name="description"
                    placeholder={item.description}
                    onChange={e => this.setDescription(e)}
                  />
                </Form.Item>
                <Form.Item label="Upload Image">
                  <Input
                    name="image"
                    type="file"
                    placeholder={item.image}
                    onChange={e => this.setImage(e)}
                  />
                </Form.Item>
                <Form.Item
                  label="Category"
                  hasFeedback
                  validateStatus="success"
                >
                  <Select
                    defaultValue="9"
                    style={{ width: 200 }}
                    onChange={this.setSelectCategory}
                  >
                    <Option value="9">Makanan</Option>
                    <Option value="10">Minuman</Option>
                    <Option value="11">Jajanan</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Price" hasFeedback validateStatus="success">
                  <Input
                    name="price"
                    placeholder={item.price}
                    onChange={e => this.setPrice(e)}
                  />
                </Form.Item>
                <Form.Item
                  label="Quantity"
                  hasFeedback
                  validateStatus="success"
                >
                  <Input
                    name="qty"
                    placeholder={item.qty}
                    onChange={e => this.setQty(e)}
                  />
                </Form.Item>
              </div>
            ))}
          </Form>
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              onClick={() => this.handleEditProduct(DataUpdate)}
              type="primary"
            >
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
