import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText,Card } from "reactstrap";

class AddProduct extends React.Component {
  render() {
    return (
      <Card>
        <Form onSubmit={this.addProduct}>
          <FormGroup>
            <Label>Product Name</Label>
            <Input type="text" name="name" />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input type="textarea" name="description" />
          </FormGroup>
          <FormGroup>
            <Label>Image</Label>
            <Input type="file" name="image" />
            <FormText color="muted"></FormText>
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <Input type="select" name="category">
              <option value="1">Food</option>
              <option value="2">Beverages</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input type="number" name="price" />
          </FormGroup>
          <Button color="primary">Add</Button>{" "}
          <Button color="danger" onClick={this.addModalToggle}>
            Cancel
          </Button>
        </Form>
      </Card>
    );
  }
}

export default AddProduct;
