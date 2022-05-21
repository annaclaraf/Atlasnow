exports.seed = async function(knex) {
  await knex('admin').del()
  await knex('admin').insert([
    {
      nome: 'Administrador', 
      email: 'atlasnow@admin.com', 
      password: 'admin'
    }
  ]);
};