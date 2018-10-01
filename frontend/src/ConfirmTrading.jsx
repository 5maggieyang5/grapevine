import React from 'react';
import { Table, Drawer, Button } from 'antd';
import TradeOpt from './TradeOpt.jsx';
import TwoWayTrade from './TwoWayTrade.jsx';
import './styles/App.css';

class ConfirmTrading extends React.Component {


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
/*    const columns = [
      {
        title: 'Trading Information',
        dataIndex: 'trades',
      }, {
        title: 'Trading Users',
        className: 'column-money',
        dataIndex: 'user',
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
    ];*/

/*    const data = /*(edges, users) => {
      let result = [];
      for(let edge of edges) {
        let row = {};
        for(let key = )
        result.push(row);
      }
    }
*/
/*    [{
      trades: '${edge.from} gives ${edge.foods} to ${edge.to}',//'UserA gives Banana to UserB',
      user: '${edge.from}',
      confirmed: ""
    }, {
      trades: 'UserB gives Banana to UserC',
      user: 'UserB',
      confirmed: "accept"
    }, {
      trades: 'UserC gives Banana to UserA',
      user: 'UserC',
      confirmed: "denied"
    }];*/

    let tradeOpt;
    if (this.props.edges.length === 3) {
      tradeOpt = this.props.edges.map((item,index) => <TradeOpt key={index} classKey={index} item={item} /> );
    } else {
      tradeOpt = this.props.edges.map((item,index) => <TwoWayTrade key={index} twoClassKey={index} twoItem={item} /> );
    }

    return (
      <div>
{/*        <h1>hi</h1>*/}
        <div className="allTrades">
          {tradeOpt}
        </div>

{/*        <Table className="tradingTable" columns={columns} dataSource={data} bordered/>

        <div>
          <Button id="myBtn" onClick={this.handleClick}>Confirm!</Button>
        </div>*/}
      </div>
    )
  }
}

export default ConfirmTrading


