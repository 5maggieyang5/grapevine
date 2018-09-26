"use strict";

module.exports = (knex) => {
  return {

//-------------------POSTS-----------------------//

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
    },

    createPost: async (user_id, food_id, food_picture_url, description, location_id) => {
      return await
      knex('posts').insert({
        user_id,
        food_id,
        food_picture_url,
        description,
        location_id
      });
    },

//-------------------USERS-----------------------//

    getUsers: async () => {
      return await
      knex.select().from('users')
      .orderBy('created_at', 'desc');
    },

    getUser: async (user_id) => {
      return await
      knex.select().from('users')
      .where('id', user_id)
      .then((result) => {return result[0]});
    },

  };
}
