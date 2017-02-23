'use strict';

const userhandler           = require('../handlers/user');
const userSchema            = require('../schemas/userSchema');
const authSchema            = require('../schemas/authSchema');
const changePasswordSchema  = require('../schemas/changePasswordSchema');
const Joi                   = require('joi');

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'GET',
            path   : '/users',
            config : {
                description : 'Show users list',
                notes       : 'Route affichant la liste des utilisateurs',
                tags        : [ 'api' ],
                handler     : userhandler.index
            }
        },
        {
            method : 'GET',
            path   : '/user/{_id}',
            config : {
                description : 'Show a user',
                notes       : 'Route affichant un utilisateur',
                tags        : [ 'api' ],
                handler     : userhandler.show_user,
                validate    : {
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
            }
        },
        {
            method : 'POST',
            path   : '/user/add',
            config : {
                description : 'Add a user',
                notes       : 'Route d\'ajout d\'un utilisateur',
                tags        : [ 'api' ],
                handler     : userhandler.new_user,
                validate: {
                    payload : userSchema
                }
            }
        },
        {
            method : 'PUT',
            path   : '/user/{_id}',
            config : {
                description : 'Update a user',
                notes       : 'Route de mise à jour d\'un utilisateur',
                tags        : [ 'api' ],
                handler     : userhandler.update_user,
                validate    : {
                    payload : userSchema,
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
            }
        },
        {
            method : 'DELETE',
            path   : '/user/{_id}',
            config : {
                description : 'Delete a user',
                notes       : 'Route de suppression d\'un utilisateur',
                tags        : [ 'api' ],
                handler     : userhandler.delete_user,
                validate    : {
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
            }
        },
        {
            method : 'POST',
            path   : '/user/{_id}/change_password',
            config : {
                description : 'Change the password of a user',
                notes       : 'Route changeant le mot de passe d\'un utilisateur',
                tags        : [ 'api' ],
                handler     : userhandler.change_password_user,
                validate    : {
                    payload : changePasswordSchema,
                    params  : {
                        _id : Joi.number().integer().min(1)
                    }
                },
            }
        },
        {
            method : 'POST',
            path   : '/authent',
            config : {
                description : 'Authentication',
                notes       : 'Route pour s\'authentifier',
                tags        : [ 'api' ],
                handler     : userhandler.authentication,
                validate    : {
                    payload : authSchema
                },
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name : 'user-routes'
};
