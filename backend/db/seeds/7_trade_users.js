exports.seed = async function(knex, Promise) {

  return Promise.all([
    knex('trade_users').insert({
        user_id: 1,
        trade_id: 1
      }),
    knex('trade_users').insert({
        user_id: 2,
        trade_id: 1,
        confirmed: true
      }),
    knex('trade_users').insert({
        user_id: 5,
        trade_id: 2,
        confirmed: true
      }),
    knex('trade_users').insert({
        user_id: 7,
        trade_id: 2,
      }),
    knex('trade_users').insert({
        user_id: 12,
        trade_id: 2,
      })
    ]);
};
