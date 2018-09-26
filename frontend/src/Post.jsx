import React from 'react';
import { Card,Button, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';
  import {Redirect} from 'react-router-dom'

  import Resource from './models/resource'
  const PostStore = Resource('posts');


  class Post extends React.Component {
    constructor(props) {
      debugger;
      super(props)
      this.state = {
        food_Id : (props.match.params.postId || null ),
        post: [],
        errors: null,
        redirect:''
      }
    }
  
    componentDidMount() {

      if (!this.state.food_Id) return;
      PostStore.find(this.state.food_Id)
      .then((result) => this.setState({
        
        post: result,
        errors: null,
        show: true,
        redirect: ''
      }))
      .catch((errors) => this.setState({errors: errors}))
    }
      
  
  render (){ 
    if (this.state.redirect) return <Redirect to={this.state.redirect} />

  return (
    
    <div>
    <Card>
      <CardBody>
        <CardTitle>Food ID: </CardTitle>
        <CardSubtitle>{this.state.post.food_id}</CardSubtitle>
      </CardBody>
      <CardBody>
        <CardText>{this.state.post.description}</CardText>
        <CardLink href="/">Home</CardLink>
        <CardLink href="/MakeOffer">Make Offer</CardLink>
      </CardBody>
    </Card>
  </div>
    );
  };
}
export default Post;