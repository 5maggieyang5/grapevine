import React, { Component } from 'react';
import Moment  from 'moment';

class UserDate extends Component {

  render(){
    let start = Moment(this.props.user.availability_start).utc().format("ll");
    let end = Moment(this.props.user.availability_end).utc().format("ll");

    return (
      <tbody>
        <tr>
          <td>{this.props.user.username} </td>
          <td>{start} -- {end} </td>
        </tr>
      </tbody>
    )
  }
}

export default UserDate;