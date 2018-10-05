import React from 'react';


export default class SecondLevelTrade extends React.Component {

  createTradeList = (tradeData) =>{
    let msglist = [];
    for (var key in tradeData){
      if (! tradeData.hasOwnProperty(key)) continue;
      var obj = tradeData[key]

      let message = <div><b>You ---</b>{obj['wants_from_current_user'].join(' or ')}<b>--> {key} ---</b>{obj['will_give_to_poster'].join(' or ')}<b>--> {this.props.poster_name} ---</b>{this.props.posted_food}<b>--> You</b></div>
      msglist.push(message);
    }
    return msglist;
  }


  render(){
    // Generate a list of potential trades from the JSON object.
    let msglist = this.createTradeList(this.props.trade_list);

    // Make a radio button from which user will select which trade they want to be a part of
    let Itemlist = msglist.map((item,index) => {
      return (<ul id="radiobutton" key={index} >
        <input
          id = {index}
          type  =  "radio"
          value =  {index}
          checked = {parseInt(this.props.trade_radio_select, 10) === index}
          onChange= {this.props.trade_radio_action}
        />
        {item}
      </ul>);
    });


    return(
      <div>
        {Itemlist}
      </div>
   )}

//  <form onSubmit={this.props.trade_form_action}>
//           {Itemlist}
//           <button onClick = {this.toggleHidden} type="submit" value = "Save">Confirm Trade !</button>
//         </form>



}
