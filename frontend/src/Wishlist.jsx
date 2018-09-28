import React from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Wishlist extends React.Component {
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

    let wishes = this.props.list ;  // get data from Parent component
  
    let Itemlist2 = wishes.map((item,index) => <option key = {index} value ={item}>{item} </option> );

    return (
      <div>
        <select onClick = {this.props.action}>
        <option defaultValue = ""> Click here for Wishlist</option> 
          {Itemlist2}
        </select>
      </div>
      
    );
  }
}




// <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//         <DropdownToggle caret>
//           Wishlist
//         </DropdownToggle>
//         <DropdownMenu>
//           {Itemlist2}
//         </DropdownMenu>
//       </Dropdown>