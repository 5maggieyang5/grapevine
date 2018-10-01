import React, { Component } from 'react';
import { Steps, Button, message } from 'antd';
import TopNav from './TopNav.jsx';
import PickDate from './tradingDate/PickDate.jsx';
import ConfirmTrading from './ConfirmTrading.jsx';
import Resource from './models/resource'


const TradesDB = Resource('trades');

const Step = Steps.Step;


class Trades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      tradesId: (props.match.params.tradesId || null),
      trade: {edges: [], users: []},
      errors: null
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

  render() {
    const { current } = this.state;
    const steps = [{
      title: 'Confirm Trading',
      content: <ConfirmTrading edges={this.state.trade.edges} users={this.state.trade.users}/>
    }, {
      title: 'Pick the Trading Date',
      content: <PickDate />
    }, {
      title: 'Pick the Trading Location',
      content: 'Pick the Trading Date Component'
    }, {
      title: 'Trading Information',
      content: 'Trading Information Component'
    }, {
      title: 'Provide a Review',
      content: 'Provide a Review Component'
    }];

    return (
      <div id="trading-container">
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
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