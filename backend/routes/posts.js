"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const db = require('../db/dbHelpers')(knex);

  router.get("/", async (req, res) => {
    const posts = await db.getPosts();
    res.json(posts);
  });

  router.post("/", async (req, res) => {
    const { userId, foodId, imageUrl, description, locationId } = req.body;
    await db.createPost(userId, foodId, imageUrl, description, locationId);
    res.json('success?');
  });

  router.get("/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await db.getPost(postId);
    res.json(post);
  });

  return router;
}
