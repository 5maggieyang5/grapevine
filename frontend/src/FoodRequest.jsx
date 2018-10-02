import React from 'react';
import { Form, FormGroup, Label, Input  } from 'reactstrap';

export default class FoodRequest extends React.Component {

  handleSubmit(ev){
    this.handleSubmit = this.handleSubmit.bind(this);
    
    
  }

  render() {
    return (
      <div>
      <Form onSubmit = {this.handleSubmit}>
        <FormGroup>
          <Label for="foodItem">What are you looking for ?</Label>
          <Input type="foodItem" name="foodItem" id="foodItem" placeholder="with a placeholder" />
        </FormGroup>
      </Form>
      </div>
    )}

}