exports.up = function(knex) {
    return knex.schema.createTable('endereços', table => {
        table.increments('id')

        table.string('funcionarioCPF')
    
        table.string('rua').notNullable()
        table.string('numero').notNullable()
        table.string('CEP').notNullable()
        table.string('cidade').notNullable()
        table.string('estado').notNullable()

        table.foreign('funcionarioCPF').references('CPF').inTable('funcionarios').onDelete('CASCADE');
        
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};


exports.down = function(knex) {
    return knex.schema.dropTable('endereços')
};
