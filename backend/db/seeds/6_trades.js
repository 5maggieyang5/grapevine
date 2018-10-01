exports.seed = async function(knex, Promise) {
  await knex.raw('ALTER SEQUENCE trades_id_seq RESTART');

  const username1 = (await knex.select('username').from('users').where('id', 1))[0].username;
  const username2 = (await knex.select('username').from('users').where('id', 2))[0].username;
  const username3 = (await knex.select('username').from('users').where('id', 3))[0].username;

  await knex('trades').insert({
        post_id: 1,
        edges: JSON.stringify([{ from: username1, to: username2, foods: ['Apples'] }, { from: username2, to: username1, foods: ['Pears'] }])
      });

  return Promise.all([
    knex('trades').insert({
        post_id: 2,
        edges: JSON.stringify([
            { from: username2, to: username3, foods: ['Grapes'] },
            { from: username3, to: username1, foods: ['Pineapples', 'Oranges']},
            { from: username1, to: username2, foods: ['Bananas', 'Tomatoes']}
          ])
      })
    ]);
};
