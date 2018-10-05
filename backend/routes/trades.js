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
      let location = await db.getLocation(user.location_id);
      user.location = location;

      let userData = await db.getUser(user.user_id);
      user.username = userData.username;
      user.email = userData.email;
      user.phone_number = userData.phone_number;
      user.avatar = userData.avatar_image_url;
      return user;
    }));

    trade.users = trade_users;

    let trade_location = await db.getLocation(trade.suggested_location_id);
    trade.suggested_location = trade_location;

    res.json(trade);
  });

  router.post("/", async (req, res) => {
    const post_id = req.body.post_id;

    const poster = await db.getPoster(post_id);
    const current_user = await db.getUser(req.body.current_user);
    const postedFood = (await db.getPostedFood(post_id)).name;

    const edges = [];
    edges.push({ from: poster.username, to: current_user.username, foods: [postedFood]});

    if (!req.body.middle_man) {
      edges.push({ from: current_user.username, to: poster.username, foods: [req.body.selected_food_item]});
    } else {
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
        availability_end: '2018-10-18'                  //for demo purposes
      }),
      db.createTradeUser({
        trade_id: created_trade_id,
        user_id: current_user.id,
        location_id: current_user.default_location_id
      })
    ]

    if (req.body.middle_man) {
      const middle_user = await db.getUserByName(Object.keys(req.body.middle_man)[0]);
      promises.push(
        db.createTradeUser({
          trade_id: created_trade_id,
          user_id: middle_user.id,
          location_id: middle_user.default_location_id,
          confirmed: true,                                //for demo purposes
          availability_start: '2018-10-10',               //for demo purposes
          availability_end: '2018-10-19'                  //for demo purposes
        })
      )
    }

    await Promise.all(promises);

    // trade_users created, now create suggested central location

    const user_location_ids = (await db.getTradeUsers(created_trade_id)).map(user => user.location_id);
    const user_locations = await Promise.all(user_location_ids.map(async id => await db.getLocation(id)));
    const totals = {latitude: 0, longitude: 0};
    user_locations.forEach(location => {
      totals.latitude += location.latitude;
      totals.longitude += location.longitude;
    });
    totals.latitude = totals.latitude / user_locations.length;
    totals.longitude = totals.longitude / user_locations.length;
    const created_location_id = await db.createLocation(totals.latitude, totals.longitude);

    await db.updateTrade(created_trade_id, {suggested_location_id: created_location_id});

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
