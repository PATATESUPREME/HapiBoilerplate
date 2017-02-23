'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    // Password
    password :  Joi
        .string()
        .required()
        .alphanum()
        .example('password'),
    // Password confirmation
    re_password :  Joi
        .string()
        .required()
        .alphanum()
        .example('password')
});
