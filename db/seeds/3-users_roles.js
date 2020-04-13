exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users_roles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users_roles').insert([{ id_user: 1, id_role: 1 }]);
    });
};
