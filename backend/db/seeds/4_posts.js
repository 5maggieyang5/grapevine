const faker = require('faker/locale/en_CA');

exports.seed = async function(knex, Promise) {
  await knex.raw('ALTER SEQUENCE posts_id_seq RESTART');

  const promises = [];
  const existingPairs = {};

  for (let i = 0; i < 160; i++) {
    let user = ((i % 40) + 1);
    let food = (Math.floor(Math.random() * 61) + 1);
    let status = 'completed'; //duplicate posts will default to completed

    if (!existingPairs[`[${user}, ${food}]`]) { //if post is unique
      status = 'available';
      existingPairs[`[${user}, ${food}]`] = 1;
    }

    promises.push(
      knex('posts').insert({
        user_id: user,
        food_id: food,
        food_picture_url: '/grapes.jpg',
        description: faker.lorem.paragraph(),
        status: status,
        location_id: ((i % 40) + 1),
      })
    );
  }

  for (let i = 0; i < 80; i++) {
    promises.push(
      knex('posts').insert({
        user_id: ((i % 40) + 1),
        food_id: (Math.floor(Math.random() * 61) + 1),
        food_picture_url: '/grapes.jpg',
        description: faker.lorem.paragraph(),
        status: 'completed',
        location_id: ((i % 40) + 1),
      })
    );
  }

  return Promise.all(promises);
};
