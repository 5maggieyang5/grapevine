import React from 'react';

class Trade extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      postId : (props.match.params.postId || null ),
      post:{ user:{wishlist:[]}, food:"" } ,
      errors: null,
      redirect:'',
      collapse: false,
      selected:""
    }
  }


render(){
  console.log("Props stores: ",this.props);
return (
  <div>  
    called Trade routine !.

  </div>
)};

}

export default Trade;
