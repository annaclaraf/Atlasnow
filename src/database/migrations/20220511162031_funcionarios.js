exports.up = function(knex) {
    return knex.schema.createTable('funcionarios', table => {
        table.string('CPF').notNullable().unique().primary()
    
        table.string('nome').notNullable()
        table.string('email').notNullable().unique()
        table.string('telefone').notNullable()
        table.string('setor').notNullable()
                
        

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('funcionarios')
};
