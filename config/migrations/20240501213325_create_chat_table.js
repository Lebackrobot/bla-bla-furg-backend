/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('chats', function (table) {
    table.increments('id').primary(),
    table.string('visibility', ['PUBLIC', 'PRIVATE']).notNullable()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.string('password')
    table.string('type', ['STUDY', 'NOTIFY', 'FUN']).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('chats')
};
