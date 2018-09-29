exports.seed = async function(knex, Promise) {
  await knex.raw('ALTER SEQUENCE trades_id_seq RESTART');

  await knex('trades').insert({
        post_id: 1,
        edges: JSON.stringify([{ from: 'Maggie', to: 'Damion', foods: ['Apples'] }, { from: 'Damion', to: 'Maggie', foods: ['Pears'] }])
      });

  return Promise.all([
    knex('trades').insert({
        post_id: 5,
        edges: JSON.stringify([
            { from: 'Maggie', to: 'Damion', foods: ['Grapes'] },
            { from: 'Damion', to: 'Jordan', foods: ['Pineapples', 'Oranges']},
            { from: 'Jordan', to: 'Maggie', foods: ['Bananas', 'Tomatoes']}
          ])
      })
    ]);
};
