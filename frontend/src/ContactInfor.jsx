import React, { Component } from 'react';

class ContactInfor extends Component {

  render(){

    return (
      <div>
        <h1 id="contact_header"> Here is all the users' contact information:</h1>
        <table id="contact_table">
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
              <td className="tableLine">{user.email}</td>
              <td className="tableLine">{user.phone_number}</td>
            </tr>
           ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ContactInfor;