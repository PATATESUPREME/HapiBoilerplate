'use strict';

const path      = require('path');
const modelsDir = path.join(__dirname, '../../app/models/');

module.exports.init = server => {
    return new Promise((resolve, reject) => {
        server.register({
            register : require('k7'),
            options : {
                connectionString : 'mongodb://127.0.0.1:27017/hapi',
                adapter : require('k7-mongoose'),
                models : [
                    path.join(modelsDir, '**/*.js')
                ],
            }
        }, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};