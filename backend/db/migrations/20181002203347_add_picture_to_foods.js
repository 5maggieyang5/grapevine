
exports.up = function(knex, Promise) {
  return knex.schema.table('foods', function(t) {
    t.string('picture');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('foods', function(t) {
    t.dropColumn('picture');
  });
};
