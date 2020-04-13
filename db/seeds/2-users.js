exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          identification: '123456789',
          name: 'Admin',
          last_name: 'Admin',
          phone: '1234567890',
          picture: 'https://i1.wp.com/cdn.auth0.com/avatars/aa.png',
          email: 'admin@test.com',
          password: 'admin123',
          enable: true,
        },
      ]);
    });
};
