import React from 'react';
import { Container,  Row,Col } from 'reactstrap';


  import {Redirect} from 'react-router-dom'
  import Wishlist from './Wishlist.jsx';
  // import FoodOffered from './FoodOffered.jsx';
  import Resource from './models/resource';
  import WishContainer from './WishContainer.jsx';


  const PostStore = Resource('posts');
  const Trade = Resource('trades');

  class Post extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        postId : (props.match.params.postId || null ),
        post:{ user:{wishlist:[]}, food:"" } ,
        errors: null,
        redirect:'',
        collapse: false,
        selected_food_item:"",
        current_user: 1,
        isHidden:true,
        radio_selection:"",
        offered_item:""
      }
    }
  
    componentDidMount() {

      PostStore.find(this.state.postId)
      .then((result) =>{
        this.setState({
        
          post: result,
          errors: null,
          show: true,
          redirect: ''
        })
        console.log(' user selected: ', this.state.selected);
      })
      .catch((errors) => this.setState({errors: errors}))
    }

    select  =  (event) => {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
        value: event.target.innerText
      });
    }

    handleChange = (event) => {
      event.preventDefault();
      this.setState({
        selected_food_item: event.target.value
      })
      console.log(" i got submit  value as: ", this.state.radio_selection)
      
      let result = fetch(`http://localhost:8080/posts/${this.state.postId}/secondarylist/1`,
      { method:'GET', mode:'cors'})
      .then( result  =>{
        console.log("data stores:" , result.json())
      }
      )

      // });
      
  
    }
    
    handleRadioChange = (event) => {
      console.log("radio button item: ",event.target.value)
      this.setState({
        radio_selection: event.target.value
      });
    }

    handleClick = (ev) => {
      ev.preventDefault();
      this.setState({show:true});
    }

    toggle = () => {
      this.setState({ collapse: !this.state.collapse });
    }
    toggleHidden =() =>  {
      this.setState({
        isHidden: !this.state.isHidden
      })
    }

    handleButtonClick = (event) => {
      event.preventDefault();
      console.log("state info: ",this.state);

      console.log("i got this as selection :", this.state.selected_food_item)
      console.log("post id: ", this.state.postId)
      Trade.create(JSON.stringify ({
          selected_food_item: this.state.selected_food_item,
          postId:this.state.postId,
          current_user: this.state.current_user,
        })
      )
    }
    

  render (){ 
    let userwishlist = this.state.post.user.wishlist;
       
  return (
    <Container id="big-Container">
    <Row>
      <Col>
        <img src ={this.state.post.food_picture_url} alt="" />
      </Col>
      
      <Col>
        <Row>
          <h3>Item: <b>{this.state.post.food.name} </b> </h3> <br/>
          {this.state.post.description}<br/><br/>
        </Row>
      </Col>
    </Row>    
    <Row>
      <Col>
        
      </Col>
      <Col>
      Map Id :{this.state.post.location_id}<br/> <br/>
      </Col>  
    </Row>
    <Row>
    <br/><br/>
    <Col xs="3"><img id = "user-avatar" src = {this.state.post.user.avatar} ></img> 
    </Col>
    <Col xs="3"></Col>
    <Col>
    <div>
        <button onClick = {this.toggleHidden}>
        Show Wishlist
        </button>
        {!this.state.isHidden && 
          <Wishlist list={userwishlist} form_action = {this.handleChange}
          radio_action = {this.handleRadioChange}
          radio_select ={this.state.radio_selection}
          /> 
        }
     </div>
    </Col>
    <Col>
      
    </Col>
    </Row>
    <Row>
    <Col>
      <br/>
      <h4>Name: {this.state.post.user.username}</h4>
      <h4>Rating :{this.state.post.user.average_rating} </h4>
    </Col>   
    <Col >
      <button onClick={this.handleButtonClick}>Trade</button>
    </Col>
   </Row>  
  </Container>
    );
  };
}
export default Post;