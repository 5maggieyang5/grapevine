"use strict";

module.exports = (knex) => {
  return {

    getAllPosts: async () => {
      return await
      knex.select().from('posts')
      .orderBy('created_at', 'desc');
    },

    getPost: async (post_id) => {
      return await
      knex.select().from('posts')
      .where('id', post_id)
      .then((result) => {return result[0]});
    }

  };
}
