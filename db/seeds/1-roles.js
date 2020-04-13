exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        { name: 'Administrador', description: 'Rol de Administrador' },
        { name: 'Usuario', description: 'Rol de Usuario' },
      ]);
    });
};
