import React, { Component } from 'react';

class UserDate extends Component {

  render(){
    return (
      <tbody>
        <tr>
          <td>{this.props.user.username} </td>
          <td>{this.props.user.startDate} -- {this.props.user.endDate} </td>
        </tr>
      </tbody>
    )
  }
}

export default UserDate;