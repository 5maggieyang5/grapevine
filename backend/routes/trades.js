"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const db = require('../db/dbHelpers')(knex);

  router.post("/", async (req, res) => {
    console.log('-----the right route got called', req.body);
    res.json('RESPONSE RESPONSE RESPONSE');
  });

  router.get("/:id", async (req, res) => {
    const trade_id = req.params.id;
    const trade = await db.getTrade(trade_id);
    res.json(trade);
  });

  return router;
}
