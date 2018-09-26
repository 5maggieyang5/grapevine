"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const db = require('../db/dbHelpers')(knex);

  router.get("/", async (req, res) => {
    const posts = await db.getAllPosts();
    res.json(posts);
  });

  router.get("/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await db.getPost(postId);
    res.json(post);
  });

  return router;
}
