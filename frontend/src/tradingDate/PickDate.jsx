import React, { Component } from 'react';
import UserDateRangePicker  from './UserDateRangePicker.jsx';
import UsersDateList        from './UsersDateList.jsx';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class PickDate extends Component {
  render() {

    return (
      <main>
        <div id="dateString">
          <p>Please pick your available date range!</p>
        </div>

        <div id="datePicker">
          <UserDateRangePicker updateDate={this.props.updateAvailableDate}/>
        </div>

        <div id="dateTable">
          <UsersDateList tradeUsers={this.props.users} tradeDate={this.props.closingDate} />
        </div>
      </main>
    );
  }
}

export default PickDate;