
exports.up = function (knex) {
  return knex.schema.table('addresses', table => {
    table.dropUnique('key');
  });
};

exports.down = function (knex) {
  return knex.schema.table('addresses', table => {
    table.unique('key');
  });
};
