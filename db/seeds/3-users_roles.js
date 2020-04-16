exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users_roles').del();
  await knex('users_roles').insert([{ id_user: 1, id_role: 1 }]);
};
