import React from 'react';
import { Steps, Button, message } from 'antd';
import TopNav from './TopNav.jsx';
import PickDate from './tradingDate/PickDate.jsx';
import ConfirmTrading from './ConfirmTrading.jsx';
import ContactInfor from './ContactInfor.jsx';
import Resource from './models/resource';
import Moment  from 'moment';
import TradeMap from './TradeMap.jsx';



const TradesDB = Resource('trades');

const Step = Steps.Step;


class Trades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      tradesId: (props.match.params.tradesId || null),
      trade: {edges: [], users: []},
      errors: null,
      disabled: true
    };
  }

  componentDidMount() {
    console.log('..........', this.state.tradesId);
    TradesDB.find(this.state.tradesId)
    .then((result) => {
      this.setState({
        trade: result,
        errors: null
      })
      console.log('----------trade ', this.state.trade.edges);
    })
    .catch((errors) => this.setState({errors: errors}))
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  currentUserConfirm = userConfirm => {
    if (userConfirm === true) {
      TradesDB.update(`${this.state.tradesId}/users/1`, JSON.stringify({confirmed: true}))
      .then((result) => {
        TradesDB.find(this.state.tradesId)
        .then((result) => {
          this.setState({
            trade: result,
            errors: null,
            disabled: false
          })
        })
        .catch((errors) => this.setState({errors: errors}))
      })
      .catch((errors) => this.setState({errors: errors}))
    } else if (userConfirm === false) {
      TradesDB.update(`${this.state.tradesId}/users/1`, JSON.stringify({confirmed: false}))
      .then((result) => {
        TradesDB.find(this.state.tradesId)
        .then((result) => {
          this.setState({
            trade: result,
            errors: null,
            disabled: true

          })
        })
        .catch((errors) => this.setState({errors: errors}))
      })
      .catch((errors) => this.setState({errors: errors}))

    } else {
      console.log("error!!!!!!!!!!!!!!!!!")
    }
  }

  updateAvailableDate = (startDate, endDate) => {
    let start = Moment(startDate).format("ll");
    let end = Moment(endDate).format("ll");
    TradesDB.update(`${this.state.tradesId}/users/1`, JSON.stringify({availability_start: start, availability_end: end}))
      .then((result) => {
        TradesDB.find(this.state.tradesId)
        .then((result) => {
          console.log("22222222222222222",result)
          this.setState({
            trade: result,
            errors: null
          })
        })
        .catch((errors) => this.setState({errors: errors}))
      })
      .catch((errors) => this.setState({errors: errors}))
  }

  render() {
    const { current } = this.state;
    const steps = [{
      title: <b>Confirm</b>,
      content: <ConfirmTrading edges={this.state.trade.edges} users={this.state.trade.users} tradesId={this.state.tradesId} currentUserConfirm={userConfirm => this.currentUserConfirm(userConfirm)} />
    }, {
      title: <b>Date</b>,
      content: <PickDate users={this.state.trade.users} closingDate={this.state.trade.closing_date} updateAvailableDate={this.updateAvailableDate} />
    }, {
      title: <b>Location</b>,
      content: 'Central location Map'
    }, {
      title: <b>Contact</b>,
      content: <ContactInfor users={this.state.trade.users} />
    }, {
      title: <b>Review</b>,
      content: 'Provide a Review Component'
    }];

    if (this.state.trade.suggested_location) {
      let markers = this.state.trade.users.map(user => {
        let marker = user.location;
        marker.username = user.username;
        return marker;
      });
      steps[2].content =
        <TradeMap
          mapboxApiAccessToken="pk.eyJ1Ijoiamt5b3VuZ3MiLCJhIjoiY2ptbnpoOG9xMHpoejNrbnlxYjcwbjE2aCJ9.nQQU3n63lrlEQw6N1Odtxg"
          center_latitude={this.state.trade.suggested_location.latitude}
          center_longitude={this.state.trade.suggested_location.longitude}
          markers={markers}
        />;
    }

    return (
      <div id="trading-container">
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            this.state.disabled ?
              (current < steps.length - 1
                && <Button disabled type="primary" onClick={() => this.next()}>Next</Button>)
                :
              (current < steps.length - 1
                && <Button  type="primary" onClick={() => this.next()}>Next</Button>)
          }

          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}

export default Trades