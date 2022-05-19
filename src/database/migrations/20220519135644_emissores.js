exports.up = function(knex) {
    return knex.schema.createTable('emissores', table => {
        table.increments('id').primary()

        table.string('CPF').notNullable();
    
        table.timestamp('dataAdmissao').notNullable()
        table.timestamp('dataFimAdmissao')

        table.foreign('CPF').references('CPF').inTable('funcionarios').onDelete('CASCADE');
        
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('emissores')
};
