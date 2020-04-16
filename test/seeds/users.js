exports.seed = async function (knex) {
  const date = new Date();
  date.setHours(date.getHours() + 1);

  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      identification: '1234567890',
      name: 'Test',
      last_name: 'Test',
      phone: '1234567890',
      picture: 'https://i1.wp.com/cdn.auth0.com/avatars/fm.png',
      email: 'test@test.com',
      verified: false,
      email_verification_token: 'testToken',
      email_verification_expires: date,
      password: 'test123',
      enable: true,
    },
  ]);
};
