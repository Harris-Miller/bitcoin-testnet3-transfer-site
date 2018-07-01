
exports.up = function(knex, Promise) {
  return knex.schema.table('addresses', table => {
    table.string('event_id').notNullable().unique();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('addresses', table => {
    table.dropColumn('event_id');
    tabledropTimestamps();
  });
};
