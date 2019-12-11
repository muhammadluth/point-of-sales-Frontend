import React, { Component } from "react";
import {
  Table,
  Icon,
  Layout,
  Typography,
  Divider,
  Button,
  Input,
  Form,
  Select,
  Modal
} from "antd";
import "../Assets/style.css";
import { connect } from "react-redux";
import { getMenu } from "../Public/Redux/Actions/Menu";
import Http from "../Public/Utils/Http";
import Navigation from "../Component/Navigation";
import Header from "../Component/Header";
import TableData from "../Component/TableData";
const { Column } = Table;
const { Option } = Select;

class Manage extends React.Component {
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
      allPage: [],
      Edit: [],
      visible: false,
      loading: true
    };
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
    this.setState({ data: this.props.data.menuList, loading: false });
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

  handleAddProduct = () => {
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
    Http.post(`/api/v1/product/`, pd, {
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
  async handleDelete(dataIndex) {
    let id = dataIndex;
    await Http.delete(`/api/v1/product/${id}`, {
      headers: {
        authorization: `${localStorage.getItem("token")}`
      }
    }).then(res => {
      window.location.href = "/manage";
    });
  }

  render() {
    console.log(localStorage.getItem("token"));
    const { visible } = this.state;
    return (
      <Layout className="layout">
        <Navigation />
        <Layout>
          <Header />
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
                  <Form.Item label="Name" hasFeedback validateStatus="success">
                    <Input
                      id="name"
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
                    <Input name="price" onChange={e => this.setPrice(e)} />
                  </Form.Item>
                  <Form.Item
                    label="Quantity"
                    hasFeedback
                    validateStatus="success"
                  >
                    <Input name="qty" onChange={e => this.setQty(e)} />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <div>
              <TableData
                DataTable={this.state.data}
                handleDelete={this.handleDelete}
                loading={this.state.loading}
              />
            </div>
          </div>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.menuList
  };
};

export default connect(mapStateToProps)(Manage);
