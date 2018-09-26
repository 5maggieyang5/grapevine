"use strict";

module.exports = (knex) => {
  return {

    getPosts: async () => {
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

    createPost: async (user_id, food_id, food_picture_url, description, location_id) => {
      return await
      knex('posts').insert({
        user_id,
        food_id,
        food_picture_url,
        description,
        location_id
      });
    }

  };
}
