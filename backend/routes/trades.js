"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const db = require('../db/dbHelpers')(knex);

  router.get("/:id", async (req, res) => {
    const trade_id = req.params.id;
    const trade = await db.getTrade(trade_id);
    let trade_users = await db.getTradeUsers(trade_id);

    trade_users = await Promise.all(trade_users.map(async user => {
      let username = (await db.getUser(user.user_id)).username;
      user.username = username;
      return user;
    }));

    trade.users = trade_users;
    res.json(trade);
  });

  router.post("/", async (req, res) => {
    const post_id = req.body.post_id;

    const poster = await db.getPoster(post_id);
    const current_user = await db.getUser(req.body.current_user);
    const postedFood = (await db.getPostedFood(post_id)).name;
    console.log('----------inside post', poster);
    console.log('----------inside post', current_user);
    console.log('----------inside post', postedFood);

    const edges = [];
    edges.push({ from: poster.username, to: current_user.username, foods: postedFood});

    if (!req.body.middle_man) {
      console.log('its a two way trade');
      edges.push({ from: current_user.username, to: poster.username, foods: req.body.selected_food_item});
    } else {
      console.log('its a three way trade');
      const middle_man = Object.keys(req.body.middle_man)[0];
      const middle_man_gives = req.body.middle_man[middle_man].will_give_to_poster;
      const middle_man_wants = req.body.middle_man[middle_man].wants_from_current_user;

      edges.push({ from: current_user.username, to: middle_man, foods: middle_man_wants});
      edges.push({ from: middle_man, to: poster.username, foods: middle_man_gives});
    }

    const created_trade_id = await db.createTrade(post_id, edges);

    //trade created, now create trade users
    const promises = [
      db.createTradeUser({
        trade_id: created_trade_id,
        user_id: poster.id,
        location_id:poster.default_location_id,
        confirmed: true,                                //for demo purposes
        availability_start: '2018-10-08',               //for demo purposes
        availability_end: '2018-10-13'                  //for demo purposes
      }),
      db.createTradeUser({
        trade_id: created_trade_id,
        user_id: current_user.id,
        location_id: current_user.default_location_id
      })
    ]

    console.log("---------------req.body", req.body)
    console.log("---------------req.body,middle_man", req.body.middle_man)
    if (req.body.middle_man) {
      const middle_user = await db.getUserByName(Object.keys(req.body.middle_man)[0]);
      promises.push(
        db.createTradeUser({
          trade_id: created_trade_id,
          user_id: middle_user.id,
          location_id: middle_user.default_location_id,
          confirmed: true,                                //for demo purposes
          availability_start: '2018-10-10',               //for demo purposes
          availability_end: '2018-10-15'                  //for demo purposes
        })
      )
    }

    await Promise.all(promises);

    res.json(created_trade_id);
  });

  router.patch('/:trade_id/users/:user_id', async (req, res) => {
    const trade_id = req.params.trade_id;
    const user_id = req.params.user_id;
    const changes = req.body;
    await db.updateTradeUser(trade_id, user_id, changes);
    res.status(200).end();
  })
  return router;
}
