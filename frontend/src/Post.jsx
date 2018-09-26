import React from 'react';
import { Card,Button, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';
  import {Redirect} from 'react-router-dom'

  import Resource from './models/resource'
  const PostStore = Resource('posts');


  class Post extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        postId : (props.match.params.postId || null ),
        post:{ user:"", food:""} ,
        errors: null,
        redirect:''
      }
    }
  
    componentDidMount() {

      PostStore.find(this.state.postId)
      .then((result) => this.setState({
        
        post: result,
        errors: null,
        show: true,
        redirect: ''
      }))
      .catch((errors) => this.setState({errors: errors}))
    }
      
  
  render (){ 
    let data = Object.entries(this.state.post);
     console.log("Post stores: ",data);
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    
  return (
    
    <div>
    
      
        <h2>Details </h2>
        Item Name: {this.state.post.food.name} <br/>
        Food Description: {this.state.post.description}<br/>
        User Name: {this.state.post.user.username}<br/>
        Location Id:{this.state.post.location_id}<br/> <br/>
        Description:{this.state.post.description}<br/>
        Image:{this.state.post.food_picture_url}<br/>

      
    
  </div>
    );
  };
}
export default Post;