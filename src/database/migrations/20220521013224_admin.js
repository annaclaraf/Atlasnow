exports.up = function(knex) {
    return knex.schema.createTable('admin', table => {
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin')
};
