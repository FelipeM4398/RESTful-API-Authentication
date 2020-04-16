exports.up = function (knex) {
  return knex.schema
    .createTable('permissions', function (table) {
      table.increments('id').primary();
      table.string('name', 30).notNullable().unique();
      table.string('description', 255).notNullable();
    })
    .createTable('roles', function (table) {
      table.increments('id').primary();
      table.string('name', 30).notNullable().unique();
      table.string('description', 255).notNullable();
    })
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('identification', 10).notNullable().unique();
      table.string('name', 30).notNullable();
      table.string('last_name', 30).notNullable();
      table.string('phone', 10);
      table.text('picture');
      table.string('email', 100).unique().notNullable();
      table.text('password').notNullable();
      table.boolean('verified').notNullable().defaultTo(false);
      table.string('password_reset_token', 100);
      table.string('email_verification_token', 100);
      table.dateTime('password_reset_expires');
      table.dateTime('email_verification_expires');
      table.boolean('enable').notNullable().defaultTo(true);
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
      table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('roles_permissions', function (table) {
      table
        .integer('id_role')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .notNullable()
        .index();
      table
        .integer('id_permission')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
        .notNullable()
        .index();
      table.primary(['id_role', 'id_permission']);
    })
    .createTable('users_permissions', function (table) {
      table
        .integer('id_user')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
        .index();
      table
        .integer('id_permission')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
        .notNullable()
        .index();
      table.primary(['id_user', 'id_permission']);
    })
    .createTable('users_roles', function (table) {
      table
        .integer('id_user')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
        .index();
      table
        .integer('id_role')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .notNullable()
        .index();
      table.primary(['id_user', 'id_role']);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('passwords-resets')
    .dropTableIfExists('users_permissions')
    .dropTableIfExists('users_roles')
    .dropTableIfExists('roles_permissions')
    .dropTableIfExists('permissions')
    .dropTableIfExists('roles')
    .dropTableIfExists('users');
};
