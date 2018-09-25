"use strict";

module.exports = (knex) => {
  return {

    getAllPosts: async () => {
      return await
      knex.select().from('posts')
      .orderBy('created_at', 'desc');
    }

  };
}
