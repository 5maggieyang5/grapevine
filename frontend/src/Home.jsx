import React from 'react';
import {Link} from 'react-router-dom'
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
    .catch((errors) => this.setState({errors: errors}));
  }

  render() {
    return (

      <div>
        <Container id="card-container">
          <Row>
            {this.state.posts.map((post, index) => (
              <Col md="4" sm="6" xs="12">
                <Card className="cards">
                  <a href={`/posts/${post.id}`}>
                    <CardImg top width="100%" height="300px" src={post.food_picture_url} alt="Card image cap" />
                  </a>
                  <CardBody>
                    <CardTitle>{post.food.name}</CardTitle>
                    <CardSubtitle>{post.user.username}</CardSubtitle>
                    <CardText>{post.description}</CardText>
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
