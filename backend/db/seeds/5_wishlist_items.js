exports.seed = async function(knex, Promise) {
  const promises = [];
  const existingPairs = {};

  for (let i = 0; i < 480; i++) {
    let user = ((i % 40) + 1);
    let food = (Math.floor(Math.random() * 61) + 1);

    let user_posted_foods = await knex.select('food_id').from('posts').where('user_id', user).andWhere('status', 'available');
    let user_posted_food_ids = user_posted_foods.map(obj => obj.food_id);

    if (!existingPairs[`[${user}, ${food}]`] && !user_posted_food_ids.includes(food)) {
      promises.push(
        knex('wishlist_items').insert({
          user_id: user,
          food_id: food
        })
      );
      existingPairs[`[${user}, ${food}]`] = 1;
    }
  }
  return Promise.all(promises);
};
