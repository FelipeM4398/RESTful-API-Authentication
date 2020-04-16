const bcrypt = require('bcrypt');
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash('admin123', salt);
  await knex('users').del();
  await knex('users').insert([
    {
      identification: '123456789',
      name: 'Admin',
      last_name: 'Admin',
      phone: '1234567890',
      picture: 'https://i1.wp.com/cdn.auth0.com/avatars/aa.png',
      email: 'admin@test.com',
      password: hash,
      verified: true,
      enable: true,
    },
  ]);
};
