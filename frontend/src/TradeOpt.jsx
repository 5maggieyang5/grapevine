import React, {Component} from 'react';
import { Icon } from 'antd';

class TradeOpt extends Component {
  render() {
/*    const food = this.props.item.foods.map(foodItem => foodItem);
*/    console.log("this.props.key----------", this.props)
    return (
      <div className= {"option " + this.props.classKey}>
        <h1 className={"user" + this.props.classKey}>{this.props.item.from}</h1>
        <Icon className={"arr" + this.props.classKey} type="arrow-right" theme="outlined" />
        <span className="foodItem">
          {this.props.item.foods.join(" / ")}
        </span>
      </div>
    )
  }
}

export default TradeOpt;