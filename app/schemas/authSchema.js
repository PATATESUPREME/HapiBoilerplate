'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    // Mon identifiant
    login:      Joi
        .string()
        .required()
        .example('admin')
    ,
    // Mon mot de passe
    password :  Joi
        .string()
        .required()
        .alphanum()
        .example('password')
});
