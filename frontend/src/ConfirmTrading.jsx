import React from 'react';
import { Table } from 'antd';
import TradeOpt from './TradeOpt.jsx';
import TwoWayTrade from './TwoWayTrade.jsx';
import './styles/App.css';


class ConfirmTrading extends React.Component {

/*  disableBtn = () {
    document.getElementById("myBtn").disabled = true;
  }*/

  handleClick = evt => {
    evt.preventDefault();
    if(evt.target.name === "confirm"){
      this.props.currentUserConfirm(true);
    }
    if(evt.target.name === "decline"){
      this.props.currentUserConfirm(false);
    }

  }

  render() {
    const columns = [
      {
        title: <b>Trading Infor. Detail</b>,
        dataIndex: 'trades',
      }, {
        title: <b>Trading Users</b>,
        className: 'column-money',
        dataIndex: 'user',
      }, {
        title: <b>Confirmation</b>,
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
        <div className="tradingConfirm">
          <h2 ><b>Please kindly confirm whether you want process this trading: </b></h2>
          <input  id="confirmBtn" type="submit" value="Confirm!" name="confirm" onClick={this.handleClick} />
          <input id="declineBtn" type="submit" value="Decline!" name="decline" onClick={this.handleClick} />
        </div>
      </div>
    )
  }
}

export default ConfirmTrading


