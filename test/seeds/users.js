exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          identification: '1234567890',
          name: 'Test',
          last_name: 'Test',
          phone: '1234567890',
          picture: 'https://i1.wp.com/cdn.auth0.com/avatars/fm.png',
          email: 'test@test.com',
          password: 'test123',
          enable: true,
        },
      ]);
    });
};
