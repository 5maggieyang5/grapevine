import React from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class FoodOffered extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {

    let offer = this.props.list ;  // get data from Parent component
  
    let offerlist = offer.map((item,index) => <option key = {index} value ={item}>{item} </option> );

    return (
      <div>
        <select onClick = {this.props.action}>
        <option defaultValue = ""> Select an item to offer</option> 
          {offerlist}
        </select>
      </div>
      
    );
  }
}



