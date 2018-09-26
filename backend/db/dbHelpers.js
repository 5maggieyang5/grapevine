"use strict";

module.exports = (knex) => {
  return {

//-------------------POSTS-----------------------//

    getPosts: async () => {
      return await
      knex.select('posts.*', 'users.username as user_username', 'foods.name as food_name').from('posts')
      .join('users', 'users.id', '=', 'posts.user_id')
      .join('foods', 'foods.id', '=', 'posts.food_id')
      .orderBy('posts.created_at', 'desc')
      .then(result => result.map(obj => {
        const newObj = {
          id: obj.id,
          food_picture_url: obj.food_picture_url,
          description: obj.description,
          status: obj.status,
          location_id: obj.location_id,
          created_at: obj.created_at,
          user: {
            id: obj.user_id,
            username: obj.user_username
          },
          food: {
            id: obj.food_id,
            name: obj.food_name
          }
        }
        return newObj;
      }));
    },

    getPost: async (post_id) => {
      return await
      knex.select('posts.*', 'users.username as user_username', 'foods.name as food_name').from('posts')
      .join('users', 'users.id', '=', 'posts.user_id')
      .join('foods', 'foods.id', '=', 'posts.food_id')
      .where('posts.id', post_id)
      .then(result => {
        const post = result[0];
        // nest the user info
        post.user = {
          id: post.user_id,
          username: post.user_username
        };
        post.user_id = undefined;
        post.user_username = undefined;
        //nest the food info
        post.food = {
          id: post.food_id,
          name: post.food_name
        };
        post.food_id = undefined;
        post.food_name = undefined;
        return post;
      });
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
      .then(result => {return result[0]});
    },

  };
}
