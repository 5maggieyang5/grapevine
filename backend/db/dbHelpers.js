"use strict";

module.exports = (knex) => {
  return {

    test: 'hello world',

//-------------------WISHLISTS-------------------//

    getWishlist: async function(post_id) {
      return await knex.select(
          'foods.id as food_id',
          'foods.name as food_name'
        )
        .from('posts')
        .join('users', 'users.id', '=', 'posts.user_id')
        .join('wishlist_items', 'wishlist_items.user_id', '=', 'users.id')
        .join('foods', 'foods.id', '=', 'wishlist_items.food_id')
        .where('posts.id', post_id)
    },

    getSecondList: async function(post_id, current_user_id) {
      const first_list = await this.getWishlist(post_id);
      const wanted_food_ids = first_list.map(obj => obj.food_id);
      const wanted_posts = await knex.select().from('posts').whereIn('food_id', wanted_food_ids);
      const intermediate_wishlists = await Promise.all(wanted_posts.map(post => this.getWishlist(post.id)));
      const current_users_posts = await knex.select().from('posts').where('user_id', current_user_id);
      // return current_users_posts;
      const triplets = [];
      wanted_posts.forEach((post, index) => {
        triplets.push({
          middle_man: post.user_id,
          middle_mans_food: post.food_id,
          // middle_mans_wishlist: intermediate_wishlists[index],
          current_user_can_give: []
        });
        current_users_posts.forEach(post => {
          const intermediate_food_ids = intermediate_wishlists[index].map(obj => obj.food_id);
          if (intermediate_food_ids.includes(post.food_id)) {
            triplets[index].current_user_can_give.push(post.food_id);
          }
        })
      })
      // return triplets;
      // const testarray = []
      // triplets.forEach(obj => testarray.push(...obj.current_user_can_give));
      // return testarray;
      const finalObject = {};
      for (let i = 0; i < triplets.length; i++) {
        if (triplets[i].current_user_can_give.length === 0) {
          continue;
        } else if (!finalObject[triplets[i].middle_man]) {
          finalObject[triplets[i].middle_man] = {
            will_give_to_poster: [triplets[i].middle_mans_food],
            wants_from_current_user: triplets[i].current_user_can_give
          }
        } else {
          finalObject[triplets[i].middle_man].will_give_to_poster.push(triplets[i].middle_mans_food);
          finalObject[triplets[i].middle_man].wants_from_current_user.push(...triplets[i].current_user_can_give);
        }
      }
      return finalObject;
    },


//-------------------POSTS-----------------------//

    getPosts: async function(queries) {
      let getAllPosts =
        knex.select(
          'posts.*',
          'users.username as user_username',
          'foods.name as food_name'
        )
        .from('posts')
        .join('users', 'users.id', '=', 'posts.user_id')
        .join('foods', 'foods.id', '=', 'posts.food_id')
        .orderBy('posts.created_at', 'desc');

      if (queries.food_name) {
        getAllPosts = getAllPosts.where('foods.name', queries.food_name);
      }

      return await
      getAllPosts.then(result => result.map(obj => {
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

    getPost: async function(post_id) {
      const wishlist = (await this.getWishlist(post_id)).map(obj => obj.food_name);

      return await
      knex.select(
        'posts.*',
        'users.username as user_username',
        'users.avatar_image_url as user_avatar',
        'users.average_rating as user_average_rating',
        'foods.name as food_name'
      )
      .from('posts')
      .join('users', 'users.id', '=', 'posts.user_id')
      .join('foods', 'foods.id', '=', 'posts.food_id')
      .where('posts.id', post_id)
      .then(result => result.map(async obj => {

        const newObj = {
          id: obj.id,
          food_picture_url: obj.food_picture_url,
          description: obj.description,
          status: obj.status,
          location_id: obj.location_id,
          created_at: obj.created_at,
          user: {
            id: obj.user_id,
            username: obj.user_username,
            avatar: obj.user_avatar,
            average_rating: obj.user_average_rating,
            wishlist
          },
          food: {
            id: obj.food_id,
            name: obj.food_name
          }
        };
        return newObj;
      })[0]);
    },

    createPost: async function(user_id, food_id, food_picture_url, description, location_id) {
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

    getUsers: async function() {
      return await
      knex.select().from('users')
      .orderBy('created_at', 'desc');
    },

    getUser: async function(user_id) {
      return await
      knex.select().from('users')
      .where('id', user_id)
      .then(result => {return result[0]});
    },

  };
}
