import React from 'react';
import { Table, Drawer, Button } from 'antd';
import TradeOpt from './TradeOpt.jsx';
import TwoWayTrade from './TwoWayTrade.jsx';
import './styles/App.css';
import Resource from './models/resource'


const TradesDB = Resource('trades');

class ConfirmTrading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmed: ""
    }
  }


/*  disableBtn = () {
    document.getElementById("myBtn").disabled = true;
  }*/

  handleClick = evt => {
    evt.preventDefault();
    TradesDB.update(`${this.props.tradesId}/users/2`, JSON.stringify({confirmed: true}))
    .then((result) => {
      console.log('----------result ', result);
    })
    .catch((errors) => this.setState({errors: errors}))

    //diable button
/*    this.disableBtn;*/
    //update confirm

  }

  render() {
    const columns = [
      {
        title: 'Trading Infor. Detail',
        dataIndex: 'trades',
      }, {
        title: 'Trading Users',
        className: 'column-money',
        dataIndex: 'user',
      }, {
        title: 'Confirmation',
        dataIndex: 'confirmed',
        render: text => {
            if (text === true) {
              return "Confirmed";
            } else if (text === false) {
              return "The user denied this trading, please back to main page start a new trade";
            } else {
              return "wait for the user to confirm this trade...";
            }
          }
        }
    ];

    const data = (edges, users) => {
      let result = [];

      edges.forEach((edge, index) => {
        const available_foods = edge.foods.join(' & ');
        result[index] = {
          trades: `${edge.from} has ${available_foods} available which match ${edge.to}'s wishlist`
        };
      })

      users.forEach((user, index) => {
        result[index].confirmed = user.confirmed;
        result[index].user = user.username;
      })

      return result;
    }

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

        <Table className="tradingTable" columns={columns} dataSource={data(this.props.edges, this.props.users)} bordered/>

        <div>
          <Button id="confirmBtn" onClick={this.handleClick}>Confirm!</Button>
          <Button id="declineBtn" onClick={this.handleClick}>Decline!</Button>
        </div>
      </div>
    )
  }
}

export default ConfirmTrading


