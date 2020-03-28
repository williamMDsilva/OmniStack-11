const express = require("express");
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate')

const OngsController = require("./controllers/OngsController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

routes.post("/session", SessionController.auth);

routes.get("/ongs", OngsController.index);
routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngsController.insert);

routes.get("/incidents", IncidentController.index);

routes.post("/incidents", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.insert);

routes.delete("/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), IncidentController.delete);

routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object({
        auth: Joi.string().required(),
    }).unknown()
}), ProfileController.index);

module.exports = routes;
