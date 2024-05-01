/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('user_chat', function(table) {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.integer('chat_id').unsigned().notNullable()
    table.string('role', ['HOST', 'MEMBER']).notNullable().unique(),
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('user_chat')    
};
