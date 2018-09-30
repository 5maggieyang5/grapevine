import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Row, Col } from 'reactstrap';
import * as qs from 'query-string';


// Client-side model
import Resource from './models/resource'
const PostsDB = Resource('posts')
const UsersDB = Resource('users')

class SearchedPosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      users: {},
      errors: null
    }
  }


  searchPosts(props = this.props) {
    const parsed = qs.parse(props.location.search);
    console.log(Object.keys(parsed)[0]);


    PostsDB.search(Object.keys(parsed)[0], parsed.food_name)
    .then((result) => this.setState({posts: result}))
    .catch((errors) => this.setState({errors: errors}))
  }

  componentWillReceiveProps(nextProps) {
    this.searchPosts(nextProps)
  }

/*  componentDidMount() {

    const parsed = qs.parse(this.props.location.search);
    console.log(Object.keys(parsed)[0]);


    PostsDB.search(Object.keys(parsed)[0], parsed.food_name)
    .then((result) => this.setState({posts: result}))
    .catch((errors) => this.setState({errors: errors}))
  }*/

  render() {
    return (


      <div>
        <Container>
          <Row>
            {this.state.posts.map((post, index) => (
              <Col md="4" sm="6" xs="12">
                <Card>
                  <CardImg top width="100%" src={post.food_picture_url} alt="Card image cap" />
                  <CardBody>
                    <CardTitle><h3>{post.food.name}</h3></CardTitle>
                    <CardSubtitle><h5>Owner:{post.user.username}</h5></CardSubtitle>
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

export default SearchedPosts
