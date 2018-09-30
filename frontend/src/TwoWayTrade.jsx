import React, {Component} from 'react';
import { Icon } from 'antd';

class TwoWayTrade extends Component {
  render() {
/*    const food = this.props.item.foods.map(foodItem => foodItem);
*/    console.log("this.props.key----------", this.props)
    return (
       <div className= {"twoOption " + this.props.twoClassKey}>
        <h1 className={"twoUser" + this.props.twoClassKey}>{this.props.twoItem.from}</h1>
        <Icon className={"twoArrRight" + this.props.twoClassKey} type="swap-right" theme="outlined" />
{/*        <Icon className={"twoArrLeft" + this.props.twoClassKey} type="swap-left" theme="outlined" />*/}
        <span className="foodItem">
          {this.props.twoItem.foods.join(" / ")}
        </span>
      </div>
    )
  }
}

export default TwoWayTrade;