const bcrypt = require('bcrypt');
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash('test123', salt);
  const date = new Date();
  date.setHours(date.getHours() + 1);

  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      identification: '1234567890',
      name: 'Test',
      last_name: 'Test',
      email: 'noverified@test.com',
      verified: false,
      email_verification_token: 'testToken',
      email_verification_expires: date,
      password: hash,
      enable: true,
    },
    {
      identification: '87547890',
      name: 'Test',
      last_name: 'Test',
      email: 'valid@test.com',
      verified: true,
      password: hash,
      enable: true,
    },
    {
      identification: '87547893',
      name: 'Test',
      last_name: 'Test',
      email: 'disabled@test.com',
      verified: true,
      password: hash,
      enable: false,
    },
  ]);
};
