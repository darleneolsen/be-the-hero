const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');

const app = express();


/*importa a rota para dentro do arquivo quando é um arquivo 
utilizar ./ - ./ mesma pasta do arquivo, voltar para anterior ../
quando é um parcote não precisa do ./
*/
const routes = require('./routes')
 
//Para o express entender o formato json
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
 
/*criando a rota
Métodos HTPP
GET: Buscar/ listar uma informacao no Backend Ex: os users
POST: Criar uma informação no backend
Put: alterar uma informação no backend
Delete: Deletar uma informação no backend
*/
/*
Tipos de parametro

Query Params: Parametros nomeados enviados na rota apos o ? (igual javascript no php)
Exemplo de uso query: filtros, paginacao 
http://localhost:3337/users?name=Darlene
http://localhost:3337/users?page=2
http://localhost:3337/users?name=Darlene&page=3
request   É tudo o que eu passei de requisição no meu servidor 
Para acessar os parametros da requisição
const params = request.query;
console.log(params) vai me mostrar tudo que veio na minha requisição.

reponse - retornar a reposta para o usuário

Route Params: Parametros utilizados para identificar recursos
Ex: app.get("/users/:id",(request,response) => 
http://localhost:3337/users/20 (o id do usuário após a barra)
Para acessar os parametros do Route:
const params2 = request.params;
console.log(params2);

Qual a diferença entre Query e Route?
O query eu tenho os names do campos (Ex: ?name=teste)
Route eu configuro uma resposta e acredito que o que estou recebendo é o que esta configurado.
http://localhost:3337/users/20
Eu configurei na rota que tudo que vem depois do / é id e não posso enviar parametros a mais do que configurei

Request Body - é o corpo da requisição, utilizado para criar ou alterar um recurso
Método Post utilizado para criar
No Insominia
Mudo para Post e no body json pois quero que retorne em json
{
	"name": "Darlene Olsen",
	"idade": 25
}

No backend
app.post("/users",(request,response) => {
const body = request.body;
console.log(body);
Para acessar um objeto do json body.name
//Porém preciso configurar no meu express para aceitar os tipos json

Para não ficar fazendo node index.js toda vez que eu alterar instalar o package:
npm install nodemon -D
-D para ele instalar apenas em dev, pois em produção não vai ter alteração de codigo
No arquivo package.json onde tem todas as minhas dependencias ele salvou como dev
"devDependencies": {
    "nodemon": "^2.0.2"
  }

  Como executar o nodemom ao invés do node, personalizar o script package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  Altera 
  "scripts": {
    "start": "nodemom index.js" (nome da aplicação que vai ser executada automatica)
  },
  Após alterar e salvar acessa o terminal executar:
  npm start
  Se eu quiser parar a execução automática ctrl+C e para voltar novament
  npm start
*/
/*
Tipos de Banco
SQl- Sql, Mysql, Sqllite, Postgree, Oracle
NoSql - MongoDB, CouchDB

Driver: Comum ( Select  * from users)
Query Builder: table("users").select(*).where()
Utilizando o Query Builder eu consigo converter para qualquer banco, por isso
vamos usar http://knexjs.org/ 
Install
npm install knex
E o driver de banco que você vai utilizar nesse caso vamos utiizar o 
sqllite npm install sqlite3
npx para executar um pacote
npx knex init ai ele vai criar knexfile.js (onde fica as estruturas dev/prod/test)
  development: {
    client: 'sqlite3', o banco que vou usar/ se for mysql só trocar
    connection: {
      filename: './dev.sqlite3'
    }
  },
  criar uma pasta chamada src e muda index para lá
  Muda a rota do nodemon para src/index.js no arquivo package.json
  "start": "nodemon src/index.js"

  vamos criar um arquivo para armazernar as routas ao invés de usar na index
  
  */ 

  /*
Entidades tudo que entra no banco
ONG
Casos

Funcionalidades
Login Ong
Logout Ong
Cadastro de Ong
Cadastrar novos casos
Deletar novos caso
Listar os casos da ong
Listar todos os casos
Entrar em contato com a ong
criar dentro do database a past migrations 
Alterar no knexfile.js para gravar na pasta migration
    migrations:{
      directory: "./src/database/migrations"
    }
criando o database
npx knex migrate:make create_ongs
Entra no arquivo que ele criou dentro da pasta
O método up é responsável pela criação das tabelas
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.timestamps();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("whatsapp").notNullable();
        table.string("cidade").notNullable();
        table.string("uf",2).notNullable(); //tamanho do campo
      })
  
};

E o método dow é caso der algum problema o rollback
No meu caso deletar a tabela
return knex.schema.dropTable(ongs); //deleta a tabela

Agora vamos exectuar para criar nossa tabela
npx knex migrate:latest

//rollback da utlima execucao da migration
npx knex migrate:rollback
npx knex - tudo que esta disponivel no knex
npx knex migrate:status - todas as migrations que foram executadas
*/

/*
instala o cors / quem vai poder acessar nossa aplicacao
npm install cors
*/


app.listen(3337);
