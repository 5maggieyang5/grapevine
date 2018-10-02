exports.seed = async function(knex, Promise) {

  return Promise.all([
    knex('trade_users').insert({
        trade_id: 1,
        user_id: 1,
        location_id: 1
      }),
    knex('trade_users').insert({
        trade_id: 1,
        user_id: 2,
        location_id: 2,
        confirmed: true,                          //for demo purposes
        availability_start: '2018-10-08',         //for demo purposes
        availability_end: '2018-10-13'            //for demo purposes
      }),
    knex('trade_users').insert({
        trade_id: 2,
        user_id: 1,
        location_id: 1
      }),
    knex('trade_users').insert({
        trade_id: 2,
        user_id: 2,
        location_id: 2,
        confirmed: true,                          //for demo purposes
        availability_start: '2018-10-08',         //for demo purposes
        availability_end: '2018-10-13'            //for demo purposes
      }),
    knex('trade_users').insert({
        trade_id: 2,
        user_id: 3,
        location_id: 3,
        confirmed: true,                          //for demo purposes
        availability_start: '2018-10-10',         //for demo purposes
        availability_end: '2018-10-15'            //for demo purposes
      })
    ]);
};
