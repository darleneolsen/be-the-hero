//importa o express
const express = require("express");

//validador

const {celebrate, Segments, Joi} = require("celebrate");

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

    //Query.parms
    //Route.param
    //Body
    //lista as rotas da ogns
    routes.get("/ongs",OngController.list);
    routes.post("/ongs", celebrate({
       [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          whatsapp: Joi.number().required().min(10).max(11),
          city: Joi.string().required(),
          uf: Joi.string().required().length(2)
       })

    }), OngController.create);

    //lista as rotas dos casos
    routes.get("/incidents", celebrate({
      [Segments.QUERY]: Joi.object().keys({
         page: Joi.number(),
        
      })
   }),IncidentController.list);
    
   routes.post("/incidents", celebrate({
      [Segments.BODY]: Joi.object().keys({
         title: Joi.string().required(),
         description: Joi.string().required(),
         value: Joi.number().required().integer()
      }),

      [Segments.HEADERS]: Joi.object({
         authorization: Joi.string().required(),
       }).unknown()
          

   }),IncidentController.create);
   
   routes.delete("/incidents/:id",celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         id: Joi.number().required(),
        
      })

   }), IncidentController.delete);

 //   lista as rotas dos profile
    routes.get("/profile",celebrate({
      [Segments.HEADERS]: Joi.object({
         authorization: Joi.string().required(),
        
      }).unknown()

   }),ProfileController.list);

    //exportar as rotas para acessar em outro arquivo
    module.exports = routes;