import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input} from 'reactstrap'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: "",
    }
  }

  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleClick = evt => {
    evt.preventDefault();
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: this.state.user_name,
        password: this.state.password,
      })
    })
  }

  render() {
    return (
      <div id="register-form">
        <h1 id="title_register">Login Form: </h1>
        <Form>

          <FormGroup>
            <Label for="user_name">User Name</Label>
            <Input type="text" name="user_name" id="user_name" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="password" name="password" id="Password" onChange={this.handleChange} />
          </FormGroup>

          <Button onClick={this.handleClick}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Login