
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('username');
      table.string('email');
      table.string('password');
      table.float('average_rating');
      table.integer('default_location_id');
      table.string('avatar_image_url');
      table.integer('phone_number')
      table.timestamp('created_at', true).defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('foods', function (table) { //plural???
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('wishlist_items', function (table) { //user_foods
      primary key???
      table.integer('user_id');
      table.integer('food_id');
      table.timestamp('created_at', true).defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('posts', function (table) {
      table.increments('id');
      table.integer('user_id');
      table.integer('food_id');
      table.string('food_picture_url');
      table.text('description');
      table.timestamp('created_at', true).defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('trades', function (table) { //posts
      table.increments('id');
      table.integer('post_id');
      table.string('status'); //active, pending, complete, delisted
      table.integer('progress_step'); //step 1, step 2, etc...
      table.date('closing_date');
      table.integer('suggested_location_id');
      table.integer('actual_location_id');
      table.timestamp('created_at', true).defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('trade_users', function (table) { //participants of a trade
      primary_key???
      table.integer('user_id');
      table.integer('trade_id');
      table.integer('trade_queue'); //were you first to join?, second? etc.
      table.integer('offered_food_id');
      table.date('availability_start');
      table.date('availability_end');
      table.integer('location_id') //location they set as their location for this trade
      table.timestamp('created_at', true).defaultTo(knex.fn.now()); //can this replace the trade queue?
    }),
    knex.schema.createTable('locations', function (table) { //will we store addresses in street, city, postal code form?
      table.increments('id');
      street address
      city
      postal code
      table.float('latitude');
      table.float('longitude');
      table.timestamp('created_at', true).defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('messages', function (table) {
      table.increments('id');
      table.integer('trade_user_id');
      table.string('content');
      table.timestamp('created_at', true).defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('reviews', function (table) {
      table.integer('user_id');
      table.integer('reviewer_id');
      table.integer('rating');
      table.text('content');
      table.timestamp('created_at', true).defaultTo(knex.fn.now());
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('foods'),
    knex.schema.dropTable('wishlist_items'),
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('trades'),
    knex.schema.dropTable('trade_users'),
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('reviews')
  ])
};
