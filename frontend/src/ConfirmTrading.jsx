import React from 'react'
import { Table, Drawer, Button } from 'antd';
import TradeOpt from './TradeOpt.jsx';
import TwoWayTrade from './TwoWayTrade.jsx';
import './styles/App.css'
// Client-side model
import Resource from './models/resource'


const Trades = Resource('trades')

const edges = [
  {
    from: 'UserA',
    to: 'UserB',
    foods: ['food1', 'food2']
  }, {
    from: 'UserB',
    to: 'UserC',
    foods: ['food3', 'food4']
  }, {
    from: 'UserC',
    to: 'UserA',
    foods: ['food5', 'food6']
  }
];
/*
const edges = [
  {
    from: 'UserA',
    to: 'UserB',
    foods: ['food1', 'food2']
  }, {
    from: 'UserB',
    to: 'UserC',
    foods: ['food3', 'food4']
  }
]*/

/*const columns = [
  {
    title: 'Trading Information',
    dataIndex: 'trades',
  }, {
    title: 'Trading Users',
    className: 'column-money',
    dataIndex: 'user',
    render: text => <button type="primary" onClick={this.showDrawer}>{text}</button>

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
*/

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
/*
  state = { visible: false};

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

/*  disableBtn = () {
    document.getElementById("myBtn").disabled = true;
  }*/

/*  handleClick = evt => {
    evt.preventDefault();
    fetch(`/trades/${this.state.tradeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        confirmed: true,
        current_user_id: 5
      })
    })
    //diable button
    this.disableBtn;
    //update confirm

  }
*/
  render() {
    let tradeOpt;
    if (edges.length === 3) {
      tradeOpt = edges.map((item,index) => <TradeOpt key={index} classKey={index} item={item} /> );
    } else {
      tradeOpt = edges.map((item,index) => <TwoWayTrade key={index} twoClassKey={index} twoItem={item} /> );
    }

    return (
      <div className="allTrades">
        {tradeOpt}
      </div>
    )
  }

/*     return (
      <div className="allTrades">

        {tradeOpt}
     <Table
        columns={columns}
        dataSource={data}
        bordered
      />
      <Button id="myBtn" onClick={this.handleClick}>Confirm!</Button>
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
    )*/
}

export default ConfirmTrading


