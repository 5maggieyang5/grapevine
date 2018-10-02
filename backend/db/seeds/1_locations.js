const faker = require('faker/locale/en_CA');

exports.seed = async function(knex, Promise) {
  await knex.raw('ALTER SEQUENCE locations_id_seq RESTART');

  const promises = [];

  for (let i = 0; i < 40; i++) {
    promises.push(
      knex('locations').insert({
        street_address: faker.address.streetAddress(),
        city: faker.address.city(),
        province: faker.address.state(),
        postal_code: faker.address.zipCode(),
        latitude: (Math.floor(Math.random() * 102223) + 43672249) / 1000000,
        longitude: (Math.floor(Math.random() * 304738) - 79618810) / 1000000
      })
    );
  }
  return Promise.all(promises);
};

        // latitude: faker.address.latitude(),
        // longitude: faker.address.longitude()
