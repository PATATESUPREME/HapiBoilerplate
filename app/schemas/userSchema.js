'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    // Mon identifiant
    login:      Joi
        .string()
        .example('admin')
    ,
    // Mon mot de passe non crypté
    password :  Joi
        .string()
        .alphanum()
        .min(8)
        .example('password')
    ,
    // mon@adresseemailvalide.fr
    email :     Joi
        .string()
        .email()
        .example('admin@example.fr')
    ,
    // Mon prénom requis
    firstname : Joi
        .string()
        .example('Kévin')
    ,
    // Mon nom
    lastname :  Joi
        .string()
        .example('DESSIMOULIE')
    ,
    // Ma société
    company :   Joi
        .string()
        .example('Emakina')
    ,
    // Ma fonction
    function :  Joi
        .string()
        .example('Developer')
    ,
    // numéro de sécurité social valide
    nir :       Joi
        .string()
        .regex(/^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$/)
        .example('196011616623690')
});