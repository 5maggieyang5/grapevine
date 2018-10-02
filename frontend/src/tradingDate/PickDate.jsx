import React, { Component } from 'react';
import Moment               from 'moment';
import UserDateRangePicker  from './UserDateRangePicker.jsx';
import UsersDateList        from './UsersDateList.jsx';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

/*const trade1 = {
  users: {
    userA: {
      startDate: "Sep 25, 2018",
      endDate: "Sep 30, 2018"
    },
    userB: {
      startDate: "",
      endDate: ""
    },
    userC: {
      startDate: "Sep 27, 2018",
      endDate: "Sep 28, 2018"
    },
  },
  date: "Waitting for everyone choose their available date.."
}*/

class PickDate extends Component {
/*  constructor(props){
    super(props);

    this.state = {
      currentUser: "userB",//Later should be the cookie user
      users: trade1.users,
      date: trade1.date
    }
  }*/

  /*updateDate = (startDate, endDate) => {
    let users = this.props.users;
    let currentUser = this.state.currentUser;
    users[currentUser] = {
      startDate: Moment(startDate).format("ll"),
      endDate: Moment(endDate).format("ll")
    }
    this.setState({users: users})
    console.log("this is the Current user START date after change: ", this.state.users[currentUser].startDate);
    console.log("this is the Current user END date after change: ", this.state.users[currentUser].endDate);
  }*/

  render() {

    return (
      <main>
      <h2>Please pick your available date range!</h2>

{/*        <UserDateRangePicker updateDate={this.updateDate}/>
*/}        <UserDateRangePicker updateDate={this.props.updateAvailableDate}/>
        <UsersDateList tradeUsers={this.props.users} tradeDate={this.props.closingDate} />
      </main>
    );
  }
}

export default PickDate;