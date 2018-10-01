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

  router.get("/:id/secondarylist/:user_id", async (req, res) => {
    const post_id = req.params.id;
    const current_user_id = req.params.user_id;
    const secondary_list = await db.getSecondaryList(post_id, current_user_id);
    res.json(secondary_list);
  });

  router.get("/:id", async (req, res) => {
    const post_id = req.params.id;
    const post = await db.getPost(post_id);
    const location = await db.getLocation(post.location_id);
    post.location = location;
    res.json(post);
  });

  return router;
}
