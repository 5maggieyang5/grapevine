exports.seed = async function(knex, Promise) {

  return Promise.all([
    knex('trade_users').insert({
        trade_id: 1,
        user_id: 1
      }),
    knex('trade_users').insert({
        trade_id: 1,
        user_id: 2,
        confirmed: true
      }),
    knex('trade_users').insert({
        trade_id: 2,
        user_id: 1,
        confirmed: true
      }),
    knex('trade_users').insert({
        trade_id: 2,
        user_id: 2
      }),
    knex('trade_users').insert({
        trade_id: 2,
        user_id: 3
      })
    ]);
};
