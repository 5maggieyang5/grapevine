const faker = require('faker/locale/en_CA');

exports.seed = async function(knex, Promise) {
  await knex.raw('ALTER SEQUENCE posts_id_seq RESTART');

  const promises = [];

  for (let i = 0; i < 60; i++) {
    promises.push(
      knex('posts').insert({
        user_id: ((i % 20) + 1),
        food_id: (Math.floor(Math.random() * 61) + 1),
        food_picture_url: faker.image.food(),
        description: faker.lorem.paragraph(),
        status: 'available',
        location_id: ((i % 20) + 1),
      })
    );
  }
  return Promise.all(promises);
};
