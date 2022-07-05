const { set } = require("express/lib/application");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('user', ( table)=>{
        table.increments('id').primary();
        table.string('first_name' , 10).notNullable();
        table.string('last_name' , 10 ).notNullable();
        table.string('email' , 20 ).notNullable().unique();
        table.string('mobile').notNullable().unique() ;
        table.string('password').notNullable(); 
        table.boolean('is_admin').notNullable() //defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.boolean('is_deleted').notNullable().defaultTo(false)
    })
    .createTable("genre" ,(table)=>{
        table.increments('id').primary();
        table.string('name').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.boolean('is_deleted').notNullable().defaultTo(false)
    })
    .createTable('people' , (table)=>{
        table.increments('id').primary();
        table.string('first_name' , 10).notNullable();
        // table.string('lname' , 10 ).notNullable();
        // table.string('gender' , 5 ).notNullable();
        // table.integer('age')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.boolean('is_deleted').notNullable().defaultTo(false)


    })
    .createTable('movie' , (table)=>{
        table.increments('id').primary();
        table.integer('genre_id').references('genre.id').onDelete('SET NULL');
        table.string('title' , 20 ).notNullable() ;
        table.integer('director_id').references('people.id').onDelete('SET NULL');
        table.float('duration');
        table.text('info');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.boolean('is_deleted').notNullable().defaultTo(false)

    })
    .createTable('cast' , (table)=>{
        table.increments('id').primary();
        table.integer('movie').references('movie.id').onDelete('CASCADE');
        table.integer('actor').references('people.id').onDelete('CASCADE');
        table.boolean('is_deleted').notNullable().defaultTo(false)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('user')
    .dropTable('cast')
    .dropTable('movie')
    .dropTable('genre')
    .dropTable('people');
  
};
