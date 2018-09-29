import React from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Wishlist extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      radio_select : props.radio_select
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    let wishes = this.props.list ;  // get data from Parent component
    let Itemlist3 = wishes.map ((item,index) => 
      
      <ul key = {index}>
        <input 
          type  =  "radio"
          value =  {item} 
          checked = {this.props.radio_select === item}
          onChange= {this.props.radio_action}
        />
        {item}
      </ul>);

    return (

      <div>
          <form onSubmit={this.props.form_action}>
            {Itemlist3}          
          <button type="submit" value = "Save">See Potential Trades</button>
          <button type="submit" value = "Cancel">Cancel</button>
        </form>
      </div>
      
    );
  }
}

    
// let Itemlist2 = wishes.map((item,index) => <option key = {index} value ={item}>{item} 
// </option> );
// oldversion of wishlist
// <select onClick = {this.props.action}>
//         <option defaultValue = ""> Click here for Wishlist</option> 
//           {Itemlist2}
//         </select>

// <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//         <DropdownToggle caret>
//           Wishlist
//         </DropdownToggle>
//         <DropdownMenu>
//           {Itemlist2}
//         </DropdownMenu>
//       </Dropdown>