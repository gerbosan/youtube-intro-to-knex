exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('login', (table) => {
      table.increments('id')
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.integer('role').unsigned().notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('users', (table) => {
      table.increments('id')
      table.string('name').nullable()
      table.string('resume').nullable()
      table.boolean('alive').notNullable().defaultTo(true)
      table.integer('login_id').unsigned().notNullable()
      table.foreign('login_id').references('id').inTable('login')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('todos', (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.boolean('completed').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('todos')
    .dropTable('users')
    .dropTable('login')
}
