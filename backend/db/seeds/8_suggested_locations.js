exports.seed = async function(knex, Promise) {
  const db = require('../dbHelpers')(knex);

  const promises = [];

  for (i = 1; i < 3; i ++) {
    let user_location_ids = (await db.getTradeUsers(i)).map(user => user.location_id);
    let user_locations = await Promise.all(user_location_ids.map(async id => await db.getLocation(id)));
    let totals = {latitude: 0, longitude: 0};
    user_locations.forEach(location => {
      totals.latitude += location.latitude;
      totals.longitude += location.longitude;
    });
    totals.latitude = totals.latitude / user_locations.length;
    totals.longitude = totals.longitude / user_locations.length;
    let created_location_id = await db.createLocation(totals.latitude, totals.longitude);

    promises.push(db.updateTrade(i, {suggested_location_id: created_location_id}));
  }

  return Promise.all(promises);

};
