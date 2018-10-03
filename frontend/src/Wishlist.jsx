import React from 'react';
import SecondLevelTrade from './SecondLevelTrade';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Wishlist extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      isHidden: true
    };
  }

  toggleHidden =() =>  {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render() {
    let wishes = this.props.list ;  // get data from Parent component
    let Itemlist3 = wishes.map ((item,index) => 
      
      <ul id="radiobutton" key = {index}>
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
          <button onClick = {this.toggleHidden} type="submit" value = "Save">See Possible Trades</button>

          {!this.state.isHidden &&
            <SecondLevelTrade trade_list = {this.props.trade_list} 
            trade_form_action = {this.props.trade_form_action}
            trade_radio_select = {this.props.trade_radio_select} 
            trade_radio_action = {this.props.trade_radio_action} 
            poster_name        ={this.props.poster_name} />
          }
          <button type="button" value = "Cancel" onClick ={this.props.clear_Radio} >Clear Selection</button>
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