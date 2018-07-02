
exports.up = function(knex, Promise) {
  return knex.schema.table('addresses', table => {
    table.string('event_id').unique();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('addresses', table => {
    table.dropColumn('event_id');
    table.dropTimestamps();
  });
};
