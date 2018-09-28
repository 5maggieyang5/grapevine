import React from 'react'
import { Table, Drawer, Button } from 'antd';
// Client-side model
import Resource from './models/resource'

const Trades = Resource('trades')

const columns = [
  {
    title: 'Trading Information',
    dataIndex: 'trades',
  }, {
    title: 'Trading Users',
    className: 'column-money',
    dataIndex: 'user',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Confirmation',
    dataIndex: 'confirmed',
    render: text => {
        if (text === "accept") {
          return "Confirmed";
        } else if (text === "denied") {
          return "The user denied this trading, please back to main page start a new trade";
        } else {
          return "wait for the user to confirm this trade...";
        }
      }
    }
];

const data = [{
  key: '1',
  trades: 'UserA gives Banana to UserB',
  user: 'UserA',
  confirmed: ""
}, {
  key: '2',
  trades: 'UserB gives Banana to UserC',
  user: 'UserB',
  confirmed: "accept"
}, {
  key: '3',
  trades: 'UserC gives Banana to UserA',
  user: 'UserC',
  confirmed: "denied"
}];


class ConfirmTrading extends React.Component {
 /* constructor(props) {
    super(props)
    this.state = {
      tradeId: (this.props.match.params.id || null),
      trades: {}
    }
  }

  componentDidMount() {
    if (!this.state.tradeId) return
    Trades.find(this.state.tradeId)
    .then((result) => this.setState({
      trades: result.data,
      errors: null
    }))
    .catch((errors) => this.setState({errors: errors}))
  }*/

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>User Name</p>
          <p>User Rating</p>
          <p>User Review</p>
        </Drawer>
      </div>
    );
  }

  render() {
    return (
      <Table
        columns={columns}
        dataSource={data}
        bordered
      />
    )
  }
}

export default ConfirmTrading


