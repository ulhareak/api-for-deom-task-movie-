
const dotenv = require('dotenv')
const envs = dotenv.config()
const  knex  = require("knex");

const knexfile = require('./knexfile')

module.exports = knex(knexfile.development)