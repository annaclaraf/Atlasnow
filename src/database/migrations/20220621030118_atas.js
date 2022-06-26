exports.up = function (knex) {
  return knex.schema.createTable('atas', table => {
    table.increments('id')
    table.string('tituloReuniao').notNullable()
    table.timestamp('dataInicio').notNullable()
    table.timestamp('dataFim').notNullable()
    table.string('pauta').notNullable()
    table.string('setor').notNullable()
    table.string('descricao').notNullable()
    table.string('palavrasChave').notNullable()
    table.string('ata').notNullable()

    table.timestamp('dataEmissao').defaultTo(knex.fn.now())

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};


exports.down = function (knex) {
  return knex.schema.dropTable('atas')
};