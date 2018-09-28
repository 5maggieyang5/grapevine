import React, { Component } from 'react';
import { Steps, Button, message } from 'antd';
import TopNav from './TopNav.jsx';
import PickDate from './tradingDate/PickDate.jsx'
import ConfirmTrading from './ConfirmTrading.jsx'

const Step = Steps.Step;

const steps = [{
  title: 'Confirm Trading',
/*  content: 'Confirm Trading Component'*/
content: <ConfirmTrading />
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

class Trades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
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