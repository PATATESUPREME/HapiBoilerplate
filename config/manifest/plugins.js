'use strict';

const async     = require('async');
const bunyan    = require('bunyan');
const envConfig = require('../environments/all');
const packageJson   = require('../../package.json');

module.exports.init = server => {
    return new Promise((resolve, reject) => {
        async.series({
            good(done) {
                server.register({
                    register : require('good')
                }, done);
            },
            blipp(done) {
                server.register({
                    register : require('blipp'),
                    options  : {
                        showStart : envConfig.log.showRouteAtStart,
                        showAuth  : true
                    }
                }, done);
            },
            boom(done) {
                server.register({
                    register : require('hapi-boom-decorators')
                }, done);
            },
            bunyan(done) {
                server.register({
                    register : require('hapi-bunyan'),
                    options: {
                        logger: bunyan.createLogger({ name: 'error', level: 'error' }),
                    },
                }, done);
            },
            inert(done) {
                server.register({
                    register : require('inert')
                }, done);
            },
            vision(done) {
                server.register({
                    register : require('vision')
                }, done);
            },
            swagger(done) {
                server.register({
                    register : require('hapi-swagger'),
                    option: {
                        info: {
                            'title': 'Test API Documentation',
                            'version': packageJson.version,
                        }
                    }
                }, done);
            },
        }, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};
