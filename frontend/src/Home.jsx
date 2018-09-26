import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Row, Col } from 'reactstrap';


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


      <div>
        <Container>
          <Row>
            {this.state.posts.map((post, index) => (
              <Col md="4" sm="6" xs="6">
                <Card>
                  <CardImg top width="100%" src={post.food_picture_url} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{post.food.name}</CardTitle>
                    <CardSubtitle><b>Owner:</b> {post.user.username}</CardSubtitle>
                    <CardText>{post.description}</CardText>
                    <Button>Detail</Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    )
  }
}

export default Posts
