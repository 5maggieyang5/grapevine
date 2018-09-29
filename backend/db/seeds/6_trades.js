exports.seed = async function(knex, Promise) {
  await knex.raw('ALTER SEQUENCE trades_id_seq RESTART');

  await knex('trades').insert({
        post_id: 1,
        edges: JSON.stringify([{ from: 1, to: 2, foods: ['Apples'] }, { from: 2, to: 1, foods: ['Pears'] }])
      });

  return Promise.all([
    knex('trades').insert({
        post_id: 5,
        edges: JSON.stringify([
            { from: 5, to: 7, foods: ['Grapes'] },
            { from: 7, to: 12, foods: ['Pineapples', 'Oranges']},
            { from: 12, to: 5, foods: ['Bananas', 'Tomatoes']}
          ])
      })
    ]);
};
