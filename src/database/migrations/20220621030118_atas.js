exports.up = function (knex) {
  return knex.schema.createTable('atas', table => {
    table.increments('id')
    table.string('emissorId').notNullable()
    table.string('tituloReuniao').notNullable()
    table.timestamp('dataInicio').notNullable()
    table.timestamp('dataFim').notNullable()
    table.string('pauta').notNullable()
    table.string('setor').notNullable()
    table.string('descricao').notNullable()
    table.string('palavrasChave').notNullable()
    table.longtext('ata').notNullable()
    table.string('status').notNullable()

    table.timestamp('dataEmissao').defaultTo(knex.fn.now())

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};


exports.down = function (knex) {
  return knex.schema.dropTable('atas')
};