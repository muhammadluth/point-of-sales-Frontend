import React, { Component } from "react";
import { Table, Icon, Divider, Button, Select } from "antd";
import EditProduct from "./EditProduct";
const { Column } = Table;
const { Option } = Select;

export default class DataTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      visible: false,
      Edit: []
    };
  }
  handleUpdate = dataIndex => {
    this.setState({
      Edit: dataIndex,
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { DataTable } = this.props;
    return (
      <div>
        <Table dataSource={DataTable} key={DataTable} rowKey="id">
          <Column title="Product" dataIndex="name" key="name" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column title="Image" dataIndex="image" key="image" />
          <Column title="Category" dataIndex="category" key="category" />
          <Column title="Price" dataIndex="price" key="price" />
          <Column title="Quantity" dataIndex="qty" key="qty" />
          <Column
            title="Action"
            dataIndex="id"
            render={dataIndex => (
              <span>
                <a>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => this.handleUpdate(dataIndex)}
                  >
                    <Icon type="edit" style={{ color: "whit" }} />
                  </Button>
                </a>

                <Divider type="vertical" />
                <a>
                  <Button
                    size="small"
                    type="danger"
                    onClick={() => this.props.handleDelete(dataIndex)}
                  >
                    <Icon type="delete" style={{ color: "white" }} />
                  </Button>
                </a>
              </span>
            )}
          />
        </Table>
        <EditProduct
          DataTable={this.props.DataTable}
          DataUpdate={this.state.Edit}
          visible={this.state.visible}
          onClose={this.onClose}
        />
      </div>
    );
  }
}
