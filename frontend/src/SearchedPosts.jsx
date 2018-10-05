import React from 'react';
import { Card, CardImg, CardTitle, CardText,
  CardSubtitle, CardBody, Container, Row, Col } from 'reactstrap';
import * as qs from 'query-string';


// Client-side model
import Resource from './models/resource'
const PostsDB = Resource('posts')

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


    PostsDB.search(Object.keys(parsed)[0], parsed.food_name)
    .then((result) => this.setState({posts: result}))
    .catch((errors) => this.setState({errors: errors}))
  }

  componentWillReceiveProps(nextProps) {
    this.searchPosts(nextProps)
  }

  componentDidMount() {
    this.searchPosts(this.props)
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

export default SearchedPosts
