"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const db = require('../db/dbHelpers')(knex);

  router.get("/", async (req, res) => {
    const users = await db.getUsers();
    res.json(users);
  });

  router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await db.getUser(userId);
    res.json(user);
  });

  return router;
}
