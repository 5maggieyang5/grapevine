
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.foreign('default_location_id').references('locations.id');
    }),
    knex.schema.table('wishlist_items', function (table) {
      table.foreign('user_id').references('users.id');
      table.foreign('food_id').references('foods.id');
    }),
    knex.schema.table('posts', function (table) {
      table.foreign('user_id').references('users.id');
      table.foreign('food_id').references('foods.id');
      table.foreign('location_id').references('locations.id');
    }),
    knex.schema.table('trades', function (table) {
      table.foreign('post_id').references('posts.id');
      table.foreign('suggested_location_id').references('locations.id');
      table.foreign('actual_location_id').references('locations.id');
    }),
    knex.schema.table('trade_users', function (table) {
      table.foreign('trade_id').references('trades.id');
      table.foreign('user_id').references('users.id');
      table.foreign('location_id').references('locations.id');
    }),
    knex.schema.table('messages', function (table) {
      table.foreign('user_id').references('users.id');
      table.foreign('trade_id').references('trades.id');
    }),
    knex.schema.table('reviews', function (table) {
      table.foreign('user_id').references('users.id');
      table.foreign('reviewer_id').references('users.id');
    }),
    knex.schema.table('potential_trades', function (table) {
      table.foreign('from_user_id').references('users.id');
      table.foreign('to_user_id').references('users.id');
      table.foreign('food_id').references('foods.id');
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropForeign('default_location_id');
    }),
    knex.schema.table('wishlist_items', function (table) {
      table.dropForeign('user_id');
      table.dropForeign('food_id');
    }),
    knex.schema.table('posts', function (table) {
      table.dropForeign('user_id');
      table.dropForeign('food_id');
      table.dropForeign('location_id');
    }),
    knex.schema.table('trades', function (table) {
      table.dropForeign('post_id');
      table.dropForeign('suggested_location_id');
      table.dropForeign('actual_location_id');
    }),
    knex.schema.table('trade_users', function (table) {
      table.dropForeign('trade_id');
      table.dropForeign('user_id');
      table.dropForeign('location_id');
    }),
    knex.schema.table('messages', function (table) {
      table.dropForeign('user_id');
      table.dropForeign('trade_id');
    }),
    knex.schema.table('reviews', function (table) {
      table.dropForeign('user_id');
      table.dropForeign('reviewer_id');
    }),
    knex.schema.table('potential_trades', function (table) {
      table.dropForeign('from_user_id');
      table.dropForeign('to_user_id');
      table.dropForeign('food_id');
    })
  ])
};

