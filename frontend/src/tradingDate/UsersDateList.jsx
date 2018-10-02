import React, { Component } from 'react';
import UserDate             from './UserDate.jsx';
import Moment               from 'moment';
import { extendMoment }     from 'moment-range';

const moment = extendMoment(Moment);

class UsersDateList extends Component {

  checkIfAllUsersHaveTradeDate = (users) => {
    for (let user in users) {
      if (users[user].availability_start && users[user].availability_end) {
      } else {
        return false;
      }
    }
    return true;
  }

  /*theOverlapDate = (users) => {
    if (this.checkIfAllUsersHaveTradeDate(users)) {
      const intersection = Object.values(users)
        .map(user => moment.range(user.startDate, user.endDate).snapTo('day'))
        .reduce((acc, x) => acc ? x.intersect(acc) : null);
      return intersection ? intersection.start.format('ll') : 'Please kindly provide a date range that most people available!';
    } else {
      return 'Waiting for everyone choose their available dates..';
    }
  }*/

  theOverlapDate = (users) => {
    if (this.checkIfAllUsersHaveTradeDate(users)) {
      const intersection = Object.values(users)
        .map(user => moment.range(user.availability_start, user.availability_end).snapTo('day'))
        .reduce((acc, x) => acc ? x.intersect(acc) : null);
      return intersection ? moment.utc(intersection.start.endOf('day')).format('ll') : 'Please kindly provide a date range that most people available!';
    } else {
      return 'Waiting for everyone choose their available dates..';
    }
  }

  render(){
/*    let users = Object.keys(this.props.tradeUsers).map((key) => {
      return {...this.props.tradeUsers[key], username: key}
    })*/

/*    let user = users.map((user) =>
      <UserDate user={user} key={user.username} />
    )*/

    let user = this.props.tradeUsers.map((user) =>
      <UserDate user={user} key={user.username} />
    )

    return (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Available dates:</th>
          </tr>
        </thead>
        {user}
        <tfoot>
          <tr>
            <td> Trade date: </td>
            <td>{this.theOverlapDate(this.props.tradeUsers)}</td>
          </tr>
        </tfoot>
      </table>
    )
  }
}

export default UsersDateList;