//importa o express
const express = require("express");

//importar o controller
const OngController  = require("./controllers/OngControllers");

const IncidentController  = require("./controllers/IncidentControllers");

const ProfileController  = require("./controllers/ProfileControllers");

const SessionController  = require("./controllers/SessionControllers");


//importa a rota para dentro do arquivo e da variavel
const routes = express.Router();

//Agora monta a rota utilizando a variavel que esta recebendo nesse caso routes
    //Rotas do login
    routes.post("/session",SessionController.create);

    //lista as rotas da ogns
    routes.get("/ongs",OngController.list);
    routes.post("/ongs",OngController.create);

    //lista as rotas dos casos
    routes.get("/incidents",IncidentController.list);
    routes.post("/incidents",IncidentController.create);
    routes.delete("/incidents/:id",IncidentController.delete);

 //   lista as rotas dos profile
    routes.get("/profile",ProfileController.list);

    //exportar as rotas para acessar em outro arquivo
    module.exports = routes;