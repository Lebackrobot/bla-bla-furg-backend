/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('messages', function(table) {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.integer('chat_id').unsigned().notNullable()
    table.string('message').notNullable()

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('messages')
};
