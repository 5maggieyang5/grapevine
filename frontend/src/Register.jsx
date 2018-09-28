import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input} from 'reactstrap'

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      password: "",
      address: "",
      phone_numb: ""
    }
  }

  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleClick = evt => {
    evt.preventDefault();
    console.log(this.state);
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        user_name: this.state.user_name,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        phone_numb: this.state.phone_numb
      })
    })
  }



  render() {
    return (
      <div id="register-form">
        <h1 id="title_register">Register Form: </h1>
        <Form>
          <FormGroup>
            <Label for="first_name">First Name</Label>
            <Input type="text" name="first_name" id="first_name" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="last_name">Last Name</Label>
            <Input type="text" name="last_name" id="last_name" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="user_name">User Name</Label>
            <Input type="text" name="user_name" id="user_name" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="Email">Email</Label>
            <Input type="email" name="email" id="Email" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="password" name="password" id="Password" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="phone_numb">Phone Number</Label>
            <Input type="tel" name="phone_numb" id="phone_numb" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required onChange={this.handleChange} />
          </FormGroup>

          <Button onClick={this.handleClick}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Register