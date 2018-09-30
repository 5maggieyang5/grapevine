import React from 'react';


export default class SecondLevelTrade extends React.Component {

  constructor(props) {
    super(props);
  }


  createTradeList = (tradeData) =>{
    let msglist = [];
    for (var key in tradeData){
      if (! tradeData.hasOwnProperty(key)) continue;
      var obj = tradeData[key]
    
      let message = `Choose trade where ${key} will give ${obj['will_give_to_poster']} and wants ${obj['wants_from_current_user']} from the current user`
      msglist.push(message);
    }
    return msglist;
  }





  render(){

    let msglist = this.createTradeList(this.props.trade_list);
    // console.log("got into 2ndlevl trade");
    // console.log("tradeData stores: ", tradeData);
     
    // let info = ["item1", "item2", "item3"]
    // console.log("Obj.values has: ", data);
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
        <form onSubmit={this.props.trade_form_action}>
          {Itemlist}
          <button onClick = {this.toggleHidden} type="submit" value = "Save">Confirm Trade !</button>
        </form>

      </div>
   )}





}
