exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
      users
        .string('username', 255)
        .notNullable()
        .unique();
      users.string('password', 255).notNullable();
    })
    .createTable('dadjokes', users => {
      users.increments();
      users
        .string('dadjoke', 500)
        .notNullable()
        .unique();
      users.integer('users_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
  };

  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  