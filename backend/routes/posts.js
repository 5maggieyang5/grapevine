"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const db = require('../db/dbHelpers')(knex);

  router.get("/", async (req, res) => {
    const posts = await db.getPosts(req.query);
    res.json(posts);
  });

  router.post("/", async (req, res) => {
    const { userId, foodId, imageUrl, description, locationId } = req.body;
    await db.createPost(userId, foodId, imageUrl, description, locationId);
    res.json('success?');
  });

  router.get("/:id/secondlist/:user_id", async (req, res) => {
    const post_id = req.params.id;
    const current_user_id = req.params.user_id;
    const second_list = await db.getSecondList(post_id, current_user_id);
    res.json(second_list);
  });

  router.get("/:id", async (req, res) => {
    const post_id = req.params.id;
    const post = await db.getPost(post_id);
    res.json(post);
  });

  return router;
}
