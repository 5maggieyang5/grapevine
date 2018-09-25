exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('resources').insert({
      id: 1,
      url: 'https://css-tricks.com/',
      title: 'CSS Tricks',
      description: 'A site full of tips and tricks about CSS styling',
      user_id: 3,
      topic_id: 1,
      average_rating: 3.5
    }),
    knex('resources').insert({
      id: 2,
      url: 'https://www.geofflawrence.com/,'
      title: 'Health and Wellness blog',
      description: 'A blog about health and wellness',
      user_id: 1,
      topic_id: 4,
      average_rating: 5
    }),
    knex('resources').insert({
      id: 3,
      url: 'http://www.ign.com',
      title: 'Writer\'s Blog',
      description: 'A blog all about writing.',
      user_id: 2,
      topic_id: 2,
      average_rating: 4.5
    }),
    knex('resources').insert({
      id: 4,
      url: 'http://www.gamespot.com',
      title: 'Engineering 101',
      description: 'A video about the fundamentals of engineering.',
      user_id: 1,
      topic_id: 3,
      average_rating: 1.5
    }),
    knex.raw('ALTER SEQUENCE resources_id_seq RESTART WITH 5')
  ]);
};
