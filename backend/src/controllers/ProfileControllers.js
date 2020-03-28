//Gera criptografia pega pelo pacote
const crypto  = require("crypto");

//Importa a conexão
const connection = require("../database/connection");

module.exports = {
    async list(request,response){
       const ong_id = request.headers.authorization; 
       const incident = await connection("incidents")
       .where("ong_id", ong_id)
       .select("*");
       return response.json(incident);
    },

};