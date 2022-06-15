exports.up = function(knex) {
  return knex.schema.createTable('setor', table => {
      table.increments('id')
      table.string('nome').notNullable()
      
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};


exports.down = function(knex) {
  return knex.schema.dropTable('setor')
};