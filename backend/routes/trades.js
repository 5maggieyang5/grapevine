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
    const userId = req.params.id;
    const user = await db.getUser(userId);
    res.json(user);
  });

  return router;
}
