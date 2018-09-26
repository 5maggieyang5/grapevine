import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody } from 'reactstrap';


// Client-side model
import Resource from './models/resource'
const PostsDB = Resource('posts')
const UsersDB = Resource('users')

class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      users: {},
      errors: null
    }
  }

  componentDidMount() {
    PostsDB.findAll()
    .then((result) => this.setState({posts: result}))
    .catch((errors) => this.setState({errors: errors}))
  }

  render() {
    return (
      <table>
      {this.state.posts.map((post, index) => (
        <tr key={index}>
          <img src={post.food_picture_url} height="100" width="100"/>
          <td>{post.description}</td>
          <td>{post.user.username}</td>
          <td>{post.food.name}</td>
        </tr>
      ))}
      </table>




    )
  }
}

export default Posts
