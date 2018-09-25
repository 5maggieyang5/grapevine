"use strict";

module.exports = (knex) => {
  return {

    createUser: async (username, password, email, bio) => {
      return await
      knex('users').insert({
        username,
        password,
        email,
        bio
      });
    },

    checkCredentials: async (email, password) => {
      return await
      knex('users').count('email')
      .where('email', email)
      .then((result) => {return result[0].count === '1'});
    },

    getUserId: async (email) => {
      return await
      knex.select('id').from('users')
      .where('email', email)
      .then((result) => {return result[0].id})
    },

    getProfile: async (user_id) => {
      return await
      knex.select('username', 'bio').from('users')
      .where('id', user_id)
      .then((result) => {return result[0]});
    },

    updateProfile: async (user_id, bio) => {
      return await
      knex('users')
      .where('id', user_id)
      .update({bio});
    },

    getMyResources: async (user_id) => {
      return await
      knex.select().from('resources')
      .where('user_id', user_id)
      .orderBy('created_at', 'desc');
    },

    getMyLikes: async (user_id) => {
      return await
      knex.select('resource_id').from('likes')
      .where('user_id', user_id)
      .orderBy('created_at', 'desc')
      .then((result) => {
        const idArray = [];
        result.forEach((object) => {
          idArray.push(object.resource_id);
        });
        return idArray;
      })
      .then(async (idArr) => {
        return await
        knex.select().from('resources')
        .whereIn('id', idArr);
      });
    },

    createResource: async (url, title, description, user_id, topic_id) => {
      return await
      knex('resources').insert({
        url,
        title,
        description,
        user_id,
        topic_id
      });
    },

    getAllResources: async () => {
      return await
      knex.select().from('resources')
      .orderBy('created_at', 'desc');
    },

    deleteResource: async (resource_id) => {
      const foreigns = Promise.all([
        knex('ratings')
        .where('resource_id', resource_id)
        .del()
        .then((num) => {console.log(num, 'ratings deleted')}),

        knex('likes')
        .where('resource_id', resource_id)
        .del()
        .then((num) => {console.log(num, 'likes deleted')}),

        knex('comments')
        .where('resource_id', resource_id)
        .del()
        .then((num) => {console.log(num, 'comments deleted')}),
      ]);

      //might need return await if i get rid of console.logs
      foreigns.then((result) => {
        knex('resources')
        .where('id', resource_id)
        .del()
        .then((num) => {console.log(num, 'resources deleted')});
      })
    },

    getResource: async (resource_id) => {
      return await
      knex.select().from('resources')
      .where('id', resource_id)
      .then((result) => {return result[0]});
    },

    updateResource: async (resource_id, url, title, description, topic_id) => {
      return await
      knex('resources')
      .where('id', resource_id)
      .update({
        url,
        title,
        description,
        topic_id
      });
    },

    searchResources: async (query) => {
      return await
      knex.select('resources.id').from('resources')
      .join('users', 'users.id', '=', 'resources.user_id')
      .join('topics', 'topics.id', '=', 'resources.topic_id')
      .where('username', 'ilike', query)
      .orWhere('topics.name', 'ilike', query)
      .orWhere('resources.title', 'ilike', query)
      .then((result) => {
        const idArray = [];
        result.forEach((object) => {
          idArray.push(object.id);
        })
        return idArray;
      })
      .then(async (idArr) => {
        return await
        knex.select().from('resources')
        .whereIn('id', idArr)
        .orderBy('created_at', 'desc')
      })
    },

    createComment: async (message, user_id, resource_id) => {
      return await
      knex('comments').insert({
        message,
        user_id,
        resource_id,
      });
    },

    getComments: async (resource_id) => {
      return await
      knex.select().from('comments')
      .where('resource_id', resource_id)
      .orderBy('created_at', 'desc');
    },

    likeExists: async (user_id, resource_id) => {
      return await
      knex('likes')
      .count('created_at')
      .where('user_id', user_id)
      .andWhere('resource_id', resource_id)
      .then((result) => {return result[0].count === '1'});
    },

    createLike: async (user_id, resource_id) => {
      return await
      knex('likes').insert({
        user_id,
        resource_id
      });
    },

    deleteLike: async (user_id, resource_id) => {
      return await
      knex('likes')
      .where('user_id', user_id)
      .andWhere('resource_id', resource_id)
      .del();
    },

    ratingExists: async (user_id, resource_id) => {
      return await
      knex('ratings')
      .count('stars')
      .where('user_id', user_id)
      .andWhere('resource_id', resource_id)
      .then((result) => {return result[0].count === '1'});
    },

    getRating: async (user_id, resource_id) => {
      return await
      knex.select('stars')
      .from('ratings')
      .where('user_id', user_id)
      .andWhere('resource_id', resource_id)
      .then((result) => {return result[0].stars});
    },

    createRating: async (stars, user_id, resource_id) => {
      return await
      knex('ratings').insert({
        stars,
        user_id,
        resource_id,
      });
    },

    updateRating: async (stars, user_id, resource_id) => {
      return await
      knex('ratings')
      .where('user_id', user_id)
      .andWhere('resource_id', resource_id)
      .update({stars});
    },

    getAverageRating: async (resource_id) => {
      return await
      knex('ratings').avg('stars')
      .where('resource_id', resource_id)
      .then((result) => {return result[0].avg})
    },

    updateAverageRating: async (average_rating, resource_id) => {
      return await
      knex('resources')
      .where('id', resource_id)
      .update({average_rating});
    }

  };
}
