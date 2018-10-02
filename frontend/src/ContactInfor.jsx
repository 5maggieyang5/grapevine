import React, { Component } from 'react';

class ContactInfor extends Component {

  render(){

    return (
      <table>
        <thead>
          <tr>
            <th className="tableLine">Username</th>
            <th className="tableLine">Email:</th>
            <th className="tableLine">Phone Number:</th>
          </tr>
        </thead>
        <tbody>
        {this.props.users.map((user) => (
          <tr>
            <td className="tableLine">{user.username}</td>
            <td className="tableLine">{user.username}</td>
            <td className="tableLine">{user.username}</td>
          </tr>
         ))}
        </tbody>
      </table>
    )
  }
}

export default ContactInfor;