exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries in an order that won't give foreign key errors
  return knex('reviews').del()
  .then(()=>{return knex('messages').del()})
  .then(()=>{return knex('trade_users').del()})
  .then(()=>{return knex('trades').del()})
  .then(()=>{return knex('potential_gives').del()})
  .then(()=>{return knex('wishlist_items').del()})
  .then(()=>{return knex('posts').del()})
  .then(()=>{return knex('users').del()})
  .then(()=>{return knex('foods').del()})
  .then(()=>{return knex('locations').del()})
};
