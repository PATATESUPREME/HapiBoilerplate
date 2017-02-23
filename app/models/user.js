'use strict';

const jsonToMongoose = require('json-mongoose');
const crypt          = require('@patatesupreme/iut-encrypt');
const mongoose       = require('k7-mongoose').mongoose();

module.exports = jsonToMongoose({
    mongoose    : mongoose,
    collection  : 'user',
    schema      : require('../schemas/userSchema'),
    autoinc     : {
        field : '_id'
    },
    pre         : {
        save : (doc, next) => {
            let encoded = crypt.sha1(doc.password);

            if (!encoded) {
                new Error("Error when encoding password !")
            }

            doc.password = encoded;

            return next();
        }
    },
    schemaUpdate : (schema) => {
        schema.login.unique  = true;
        schema.email.unique  = true;
        schema.nir.unique    = true;

        return schema;
    },
    transform : (doc, ret, options) => {
        delete ret.password;
        delete ret.nir;

        return ret;
    }
});