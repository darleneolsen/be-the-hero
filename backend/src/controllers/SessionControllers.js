//Gera criptografia pega pelo pacote
const crypto  = require("crypto");

//Importa a conexão
const connection = require("../database/connection");

module.exports = {
    async create(request,response){
       //vou receber cada variavel do request separada, assim o usuário não envia variável a mais
        const { id } = request.body;

        const ong = await connection("ongs")
        .where("id", id)
        .select("name")
        .first();
 
        if(!ong){
             return response.status(400).json({error:'Ong não localizada'});
      
        }
        
        return response.json(ong);
       
    },
    
  
};