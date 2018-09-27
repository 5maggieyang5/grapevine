import React from 'react';
import { CardImg, CardText, CardLink,
  CardTitle, CardSubtitle, Collapse, Button, CardBody, Card} from 'reactstrap';

  import {Redirect} from 'react-router-dom'

  import Resource from './models/resource'
  const PostStore = Resource('posts');


  class Post extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        postId : (props.match.params.postId || null ),
        post:{ user:{wishlist:[]}, food:"" } ,
        errors: null,
        redirect:'',
        collapse: false
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
    
    handleClick = (ev) => {
      ev.preventDefault();
      this.setState({show:true});
      
    }
  


    toggle = () => {
      this.setState({ collapse: !this.state.collapse });
    }

  
  render (){ 
    let data = Object.entries(this.state.post);

    let userwishlist = this.state.post.user.wishlist;
    
     console.log("Wishlist item: ",userwishlist[0]);
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    
    const listItems = userwishlist.map((item,index) =>
    <ul key={index}> {item}</ul>);

  return (
    <div>
       <h2>Details </h2>
        Item Name: {this.state.post.food.name} <br/>
        Food Description: {this.state.post.description}<br/>
        User Name: {this.state.post.user.username}<br/>
        Location Id:{this.state.post.location_id}<br/> <br/>
        Description:{this.state.post.description}<br/>
        Image:{this.state.post.food_picture_url}<br/>
        

      <div>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View Wishlist</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              {listItems}
            </CardBody>
          </Card>
        </Collapse>
      </div>
  </div>
    );
  };
}
export default Post;