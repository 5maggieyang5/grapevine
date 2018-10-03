import React from 'react';


export default class SecondLevelTrade extends React.Component {

  createTradeList = (tradeData) =>{
    let msglist = [];
    for (var key in tradeData){
      if (! tradeData.hasOwnProperty(key)) continue;
      var obj = tradeData[key]

      let message = <div>Offer <b>{obj['wants_from_current_user'].join(' or ')}</b> to <b>{key}</b> who can give {obj['will_give_to_poster'].join(' or ')} to {this.props.poster_name}</div>
      msglist.push(message);
    }
    return msglist;
  }


  render(){
    // Generate a list of potential trades from the JSON object.
    let msglist = this.createTradeList(this.props.trade_list);

    // Make a radio button from which user will select which trade they want to be a part of
    let Itemlist = msglist.map ((item,index) =>
        <ul id="radiobutton" key = {index}   >
        <input
          id = {index}
          type  =  "radio"
          value =  {item}
          checked = {this.props.trade_radio_select === item}
          onChange= {this.props.trade_radio_action}
        />
        {item}
      </ul>);


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
