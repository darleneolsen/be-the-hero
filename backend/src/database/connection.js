//importar o knex pacote 
const knex = require("knex");

//importar as configuracoes do file knexfile.js
const config  = require("../../knexfile");

//usa a variavel knex e pega a configuracao da config
const connection = knex(config.development);

//exportar
module.exports = connection;