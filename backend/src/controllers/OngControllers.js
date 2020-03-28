//Gera criptografia pega pelo pacote
const crypto  = require("crypto");

//Importa a conexão
const connection = require("../database/connection");

module.exports = {
    async list(request,response){
        const ongs = await connection("ongs").select("*");
        return response.json(ongs);    

    },

    async create(request,response){
       //vou receber cada variavel do request separada, assim o usuário não envia variável a mais
        const { name, email, whatsapp, city, uf } = request.body;
    
        //gerar um número randomico
        const id = crypto.randomBytes(4).toString("HEX");
    
        //insert await só retorna depois que executar.
        await connection("ongs").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({id});
    }

};