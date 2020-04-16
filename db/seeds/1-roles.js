exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del();
  await knex('roles').insert([
    { name: 'Administrador', description: 'Rol de Administrador' },
    { name: 'Usuario', description: 'Rol de Usuario' },
  ]);
};
