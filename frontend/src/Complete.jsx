import React from 'react';
import {Link} from 'react-router-dom'
import { Container,  Row,Col } from 'reactstrap';

export default class Review extends React.Component {

  render()
  {

    return (
      <h2 id="final-header"> Thank you for using <br/>
          <Link to='/' id="final-logo">
             Grapevine
          </Link>
      </h2>
    )
  }
}