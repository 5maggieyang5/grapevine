import React from 'react';
import { Container } from 'reactstrap';

import {Redirect} from 'react-router-dom'
import Wishlist from './Wishlist.jsx';
import Resource from './models/resource'
import PostMap from './PostMap.jsx';

const PostStore = Resource('posts');
const Trade = Resource('trades');

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post_id : (props.match.params.post_id || null ),
      post:{ user:{wishlist:[]}, food:"", location:"" } ,
      errors: null,
      typeOfTrade: "twoway",
      redirect:'',
      collapse: false,
      selected_food_item:"",
      current_user: 1,
      isHidden:true,
      radio_selection:"",
      offered_item:"",
      secondlevel_trade:"",
      trade_list:"",        // list of 2rd level trades
      trade_radio_select:"",
      trade_id: ""          // the associated id of the trade radio button

    }
  }

  componentDidMount() {

    PostStore.find(this.state.post_id)
    .then((result) =>{
      this.setState({
        post: result,
        errors: null,
        show: true,
        redirect: ''
      })
    })
    .catch((errors) => this.setState({errors: errors}))
  }

  select  =  (event) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }

  handleTradeButton = async (event) =>{

    event.preventDefault();
    // Check the state variable to determine the type of trade to execute
    if (this.state.typeOfTrade ==="twoway"){
      if (!this.state.radio_selection){
        alert("Please select an item to trade.")
        return;
      }
     this.handleTwoWayTrade(event)
    } else if (this.state.typeOfTrade ==="threeway"){
      if (this.state.radio_selection){
        alert("Please clear selection to go on")
        return;
      }
      if (this.state.radio_selection) {  // if they chose an item from 1st menu
        alert("Unselect the item chosen to see possible 3way trades")
        return;
      }
      this.handleThreeWayTrade(event);

    }
  }

  closeTrades = (event) =>{
    event.preventDefault(event);
    const checkIsHidden = this.state.isHidden
    this.setState({isHidden: !checkIsHidden})

  }


  clear_Radio = (event) =>{
    event.preventDefault(event);
    this.setState({
        radio_selection:false
      });
  }

  handleChange = async (event) => {
    event.preventDefault();

    this.setState({
      selected_food_item: event.target.value,
      dropdownOpen: !this.state.dropdownOpen,

    })

    let result = await fetch(`http://localhost:8080/posts/${this.state.post_id}/secondarylist/1`,
    { method:'GET', mode:'cors'})
    .then( result  =>{
      return result.json();
    })
    this.setState({trade_list:result})
  }

  handleRadioChange = (event) => {
    this.setState({
      radio_selection: event.target.value
    });
  }

  handleTradeAction = (event) =>{
    // process the result from what was chosen from
    // second level menu
    event.preventDefault();
    this.setState({trade_radio_select: event.target.value})
  }

  handleTradeRadioChange = (event) =>{
    this.setState({
      trade_radio_select: event.target.value,
      typeOfTrade: "threeway",
      trade_id: event.target.getAttribute("id")
    });
  }

  handleThreeWayTrade = (event) =>{
    event.preventDefault();
    event.stopPropagation()   // prevents the nested from also triggering parent form

    let temp = Number(this.state.trade_id);
    let trade_data = this.state.trade_list;
    let i = 0;
    let the_data={};
    for (var item in trade_data){
      if (i === temp){
         the_data[item]= trade_data[item];
      }
      i++;
    }

    Trade.create(JSON.stringify( {
      middle_man: the_data,
      post_id: this.state.post_id,
      current_user: this.state.current_user }))
      .then(response => {
        this.setState({trade_id:response.data})
        const Url = this.buildUrl(response.data) // sets up localhst
        this.setState({redirect: Url})
      })
    }

  buildUrl =   (param)  => {
    return `/trades/${param}`;
  }

  handleTwoWayTrade = (event) => {
    event.preventDefault();


    Trade.create(JSON.stringify({
      selected_food_item : this.state.radio_selection,
      post_id:this.state.post_id,
      current_user: this.state.current_user,
      })
      ).then( response => {
        this.setState({trade_id:response.data})
        const Url = this.buildUrl(response.data) // sets up localhst
        this.setState({redirect: Url})
      })
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


  render () {
    let userwishlist = this.state.post.user.wishlist;

    if (this.state.redirect !== '') {
      return <Redirect to={this.state.redirect} />
    }

  return (
    <Container id="post-container">
      <div id='post-food-picture'>
        <img className="imgView" src={this.state.post.food_picture_url} alt="" />
      </div>

      <h2 id="post-food-name">
        {this.state.post.food.name}
      </h2>

      <p id="post-description">
        {this.state.post.description}
      </p>

      {this.state.post.location.latitude && this.state.post.location.longitude &&
        <div id="post-map">
          <PostMap
            mapboxApiAccessToken="pk.eyJ1Ijoiamt5b3VuZ3MiLCJhIjoiY2ptbnpoOG9xMHpoejNrbnlxYjcwbjE2aCJ9.nQQU3n63lrlEQw6N1Odtxg"
            latitude={this.state.post.location.latitude}
            longitude={this.state.post.location.longitude}
          />
        </div>
      }

      <div id="post-avatar">
        <img id="user-avatar" src={this.state.post.user.avatar} alt="avatar" />
      </div>

      <div id="post-username-rating">
        <h3>{this.state.post.user.username}</h3>
        <div>
          <img className="grapes" src="/purplegrapes.svg" alt="grape-rating" />
          <img className="grapes" src="/purplegrapes.svg" alt="grape-rating" />
          <img className="grapes" src="/purplegrapes.svg" alt="grape-rating" />
          <img className="grapes" src="/purplegrapes.svg" alt="grape-rating" />
          <img className="grapes" src="/cleargrapes.svg"  alt="grape-rating" />
        </div>
      </div>

      <button  id="show-wishlist" onClick={this.toggleHidden}>
        Wishlist
      </button>


      {!this.state.isHidden &&
        <div id="wishlist">
          <Wishlist list={userwishlist} form_action = {this.handleChange}
            radio_action = {this.handleRadioChange}
            radio_select ={this.state.radio_selection}
            clear_Radio = {this.clear_Radio}
            poster_name = {this.state.post.user.username}
            posted_food = {this.state.post.food.name}

            trade_radio_action = {this.handleTradeRadioChange}
            trade_radio_select = {this.state.trade_radio_select}
            trade_list         = {this.state.trade_list}
            trade_form_action  = {this.handleThreeWayTrade}
            closeTrades        = {this.closeTrades}
          />
          <button id="submit-button" onClick={this.handleTradeButton}>
            Make Offer
          </button>
        </div>
      }


    </Container>
    );
  };
}

export default Post;
