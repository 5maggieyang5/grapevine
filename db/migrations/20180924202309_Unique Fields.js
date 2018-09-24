
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.unique(['username']);
      table.unique(['email']);
    }),
    knex.schema.table('foods', function (table) {
      table.unique(['name']);
    }),
    knex.schema.table('wishlist_items', function (table) {
      table.unique(['user_id', 'food_id']);
    }),
    knex.schema.table('posts', function (table) {
      table.unique(['user_id', 'food_id']);
    }),
    knex.schema.table('trade_users', function (table) {
      table.unique(['user_id', 'trade_id']);
    }),
    knex.schema.table('reviews', function (table) {
      table.unique(['user_id', 'reviewer_id']);
    }),
    knex.schema.table('potential_gives', function (table) {
      table.unique(['from_user_id', 'to_user_id', 'food_id']);
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropUnique(['username']);
      table.dropUnique(['email']);
    }),
    knex.schema.table('foods', function (table) {
      table.dropUnique(['name']);
    }),
    knex.schema.table('wishlist_items', function (table) {
      table.dropUnique(['user_id', 'food_id']);
    }),
    knex.schema.table('posts', function (table) {
      table.dropUnique(['user_id', 'food_id']);
    }),
    knex.schema.table('trade_users', function (table) {
      table.dropUnique(['user_id', 'trade_id']);
    }),
    knex.schema.table('reviews', function (table) {
      table.dropUnique(['user_id', 'reviewer_id']);
    }),
    knex.schema.table('potential_gives', function (table) {
      table.dropUnique(['from_user_id', 'to_user_id', 'food_id']);
    })
  ])
};
