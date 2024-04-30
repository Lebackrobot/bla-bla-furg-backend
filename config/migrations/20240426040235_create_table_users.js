/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// 20220425153000_create_users_table.js
export const up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary()
        table.string('nickname').notNullable().unique()
        table.string('password').notNullable()
        table.string('email').notNullable().unique()
        table.binary('avatar')
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

export const down = function (knex) {
    return knex.schema.dropTable('users')
}