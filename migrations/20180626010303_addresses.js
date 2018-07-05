
exports.up = function (knex) {
  return knex.schema.createTable('addresses', table => {
    table.increments();
    table.string('key').notNullable().unique();
    table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('cascade');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('addresses');
};
