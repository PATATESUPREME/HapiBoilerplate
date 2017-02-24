'use strict';

const Hapi          = require('hapi');
const models        = require('./manifest/models');
const plugins       = require('./manifest/plugins');
const routes        = require('./manifest/routes');
const serverConfig  = require('./manifest/server');

module.exports.init = () => {
    const server = new Hapi.Server();

    return Promise.resolve().then(() => {
        return serverConfig.init(server);
    }).then(() => {
        // model configuration
        return models.init(server);
    }).then(() => {
        // plugins configuration
        return plugins.init(server);
    }).then(() => {
        // routes configuration
        return routes.init(server);
    }).then(() => {
        return server;
    });
};
