const faker = require('faker/locale/en_CA');

exports.seed = async function(knex, Promise) {
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART');

  const promises = [];

  for (let i = 0; i < 20; i++) {
    promises.push(
      knex('users').insert({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        default_location_id: (i + 1),
        avatar_image_url: faker.internet.avatar(),
        phone_number: faker.phone.phoneNumberFormat()
      })
    );
  }
  return Promise.all(promises);
};
