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
    .catch((errors) => this.setState({errors: errors}))

  }

  render() {
    return (

      <div>
        <Container>
          <Row>
            {this.state.posts.map((post, index) => (
              <Col md="4" sm="6" xs="12">
                <Card className="cards">
                  <CardImg top width="100%" height="230px" src={post.food_picture_url} alt="Card image cap" />

                  <CardBody>
                    <CardTitle><h3>{post.food.name}</h3></CardTitle>
                    <CardSubtitle><h5>Owner:{post.user.username}</h5></CardSubtitle>
                    <CardText>{post.description.slice(0,80)} ...more</CardText>
                    <Button tag={Link} to={`/posts/${post.id}`}>Detail</Button>
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
