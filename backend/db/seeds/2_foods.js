exports.seed = async function(knex, Promise) {
  await knex.raw('ALTER SEQUENCE foods_id_seq RESTART');

  const foods = [
    'Acorn Squash',
    'Artichokes',
    'Apples',
    'Arugula',
    'Asparagus',
    'Avocados',
    'Bananas',
    'Basil',
    'Beets',
    'Blackberries',
    'Blueberries',
    'Butternut Squash',
    'Cabbage',
    'Cantaloupes',
    'Carrots',
    'Chamomile',
    'Cherries',
    'Cherry Tomatoes',
    'Chives',
    'Cilantro',
    'Collard Greens',
    'Corn',
    'Cucumbers',
    'Dill',
    'Eggplant',
    'Fennel',
    'Figs',
    'Garlic',
    'Grapefruit',
    'Grapes',
    'Hot Peppers',
    'Kale',
    'Lavender',
    'Lemons',
    'Limes',
    'Mushrooms',
    'Oranges',
    'Oregano',
    'Parsley',
    'Parsnips',
    'Pears',
    'Pineapples',
    'Pole Beans',
    'Pomegranates',
    'Potatoes',
    'Pumpkins',
    'Rhubarb',
    'Rutabagas',
    'Sage',
    'Snap Peas',
    'Sorrel',
    'Spearmint',
    'Spinach',
    'Strawberries',
    'Sweet Peppers',
    'Tangerines',
    'Thyme',
    'Tomatillos',
    'Tomatoes',
    'Turnips',
    'Watermelon'
  ];

  const promises = [];

  foods.forEach( food => {
    promises.push(
      knex('foods').insert({
        name: food
      }),
    );
  })
  return Promise.all(promises);
};
