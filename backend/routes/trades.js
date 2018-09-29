"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const db = require('../db/dbHelpers')(knex);

  router.get("/:id", async (req, res) => {
    const trade_id = req.params.id;
    const trade = await db.getTrade(trade_id);
    trade.users = await db.getTradeUsers(trade_id);
    res.json(trade);
  });

  router.post("/", async (req, res) => {
    const post_id = req.body.postId;

    const poster = (await db.getPoster(post_id)).username;
    const current_user = (await db.getUser(req.body.current_user)).username;
    const postedFood = (await db.getPostedFood(post_id)).name;

    const edges = [];
    edges.push({ from: poster, to: current_user, foods: postedFood});

    if (!req.body.middle_man) {
      console.log('its a two way trade');
      edges.push({ from: current_user, to: poster, foods: req.body.selected_food_item});
    } else {
      console.log('its a three way trade');
      const middle_man = Object.keys(req.body.middle_man)[0];
      const middle_man_gives = req.body.middle_man[middle_man].will_give_to_poster;
      const middle_man_wants = req.body.middle_man[middle_man].wants_from_current_user;

      edges.push({ from: current_user, to: middle_man, foods: middle_man_wants});
      edges.push({ from: middle_man, to: poster, foods: middle_man_gives});
    }

    const created_trade_id = await db.createTrade(post_id, edges);
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
