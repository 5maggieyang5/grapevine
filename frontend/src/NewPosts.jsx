import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input} from 'reactstrap'

class NewPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      food_picture_url: "",
      description: "",
      status: "",
      location_id: 17,
      created_at: "2018-09-26T18:28:57.400Z",
      user: {
      id: 17,
      username: "Bennett.Kovacek"
      },
      food: {
      id: 58,
      name: "Tomatillos"
      }    }
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
        <h1 id="title_register">Create a New Post Form: </h1>


        <Form>
          <FormGroup>
            <label for="avatar">Food picture</label>
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
          </FormGroup>

          <FormGroup>
            <Label for="first_name">Description</Label>
            <Input type="text" name="first_name" id="first_name" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="user_name">User Name</Label>
            <Input type="text" name="user_name" id="user_name" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" onChange={this.handleChange} />
          </FormGroup>

          <Button onClick={this.handleClick}>   Submit     </Button>
        </Form>
      </div>
    );
  }
}

export default NewPosts