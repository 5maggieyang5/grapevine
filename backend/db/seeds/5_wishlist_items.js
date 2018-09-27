exports.seed = function(knex, Promise) {
  const promises = [];
  const existingPairs = {};

  for (let i = 0; i < 480; i++) {
    let user = ((i % 40) + 1);
    let food = (Math.floor(Math.random() * 61) + 1);

    if (!existingPairs[`[${user}, ${food}]`]) {
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
