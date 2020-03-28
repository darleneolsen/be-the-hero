//Gera criptografia pega pelo pacote
const crypto  = require("crypto");

//Importa a conexão
const connection = require("../database/connection");

module.exports = {
    async list(request,response){
        //paginacao
        const {page = 1} = request.query; //para pegar o que veio no get name=darlene&page=1
        const [total_registro] =  await connection("incidents").count();
       // console.log(total_registro);
        //salvado dados no header
        response.header("total",total_registro['count(*)']);

        const incidents = await connection("incidents")
                                .join("ongs", "ongs.id", "=","incidents.ong_id" )
                                .limit("5")
                                .offset((page - 1) * 5)
                                .select(['incidents.*', 
                                          'ongs.name', 
                                          'ongs.email', 
                                          'ongs.whatsapp', 
                                          'ongs.city',
                                           'ongs.uf']);
         //select("*");                       
        return response.json(incidents);   
        //http://localhost:3337/incidents?page=2 

    },

    async create(request,response){
       //vou receber cada variavel do request separada, assim o usuário não envia variável a mais
        const { title, description, value } = request.body;
    
        request.headers; // tudo que esta dentro da autenticacao
        //insert await só retorna depois que executar.
       
        //Nome authorization salvei no insomnia ta aba Header
        const ong_id = request.headers.authorization;
         
         
    //const result =    await connection("incidents").insert({
    const [id] =    await connection("incidents").insert({
            title,
            description,
            value,
            ong_id,
        });
        //const id= result[0];
        return response.json({id});
    },
    
    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;
        //Verifica se o incidente é daquela ong
        const incident = await connection("incidents")
                            .where("id", id)
                            .select("ong_id")
                            .first();

        if(typeof incident == 'undefined'){
      
            return response.status(401).json({error:'Ong não localizada'});
     

        }
        
        if(incident.ong_id != ong_id ){
            return response.status(401).json({error:'Operacao nao permitida'});
        } 

        //Deleta da tabela
        await connection("incidents").where("id",id).delete();
        return response.status(204).send();
    }

};