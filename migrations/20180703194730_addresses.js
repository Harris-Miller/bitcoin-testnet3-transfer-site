
exports.up = function(knex, Promise) {
  return knex.schema.table('addresses', table => {
    table.dropUnique('key');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('addresses', table => {
    table.unique('key');
  });
};
