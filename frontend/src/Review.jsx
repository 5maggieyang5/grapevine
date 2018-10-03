import React from 'react';
import { Container,  Row,Col } from 'reactstrap';
import Resource from './models/resource';
const UsersDB = Resource('users');

export default class Review extends React.Component {

  render()
  {

    return (
      <div>
      <h2 id="review-header"> Please provide feedback for the users you traded with </h2>
      <div id="review-parent">
        {this.props.users.map((user) => {
          if (user.user_id !== 1) {
            return (
              <div className="review-container">

                <img className="review-avatar" src={user.avatar} />
                <h3 className="review-username">{user.username}</h3>

                <select className="review-dropdown">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <textarea className="review-text"></textarea>

              </div>
            )
          }
        })}
      </div>
      </div>
    )
  }
}