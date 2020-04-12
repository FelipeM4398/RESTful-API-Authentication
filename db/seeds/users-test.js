exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          identification: '1144205319',
          name: 'Felipe',
          last_name: 'Muñoz',
          phone: '3177287425',
          picture: 'https://i1.wp.com/cdn.auth0.com/avatars/fm.png',
          email: 'felipem4398@gmail.com',
          password: 'admin123',
          enable: true,
        },
      ]);
    });
};
