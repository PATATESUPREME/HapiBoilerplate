'use strict';

const _     = require('lodash');
const crypt = require('@patatesupreme/iut-encrypt');

/*
 Possible errors
    200: success
    201: created
    204: deleted
    401: auth error (No return in body)
    404: not found
    500: une erreur survenue
 */

/*
    // ways to set fields

    model.set("field", value);

    // or

    model.field = value;

    // or

    model.set({
        "field" : value
    });
 */

/**
 * Users index
 *
 * @param request
 * @param response
 */
module.exports.index = (request, response) => {
    request.server.database.user.find({}).then(data => {
        if (data) {
            response(null, data.map(user => user.toObject()));
            return;
        }
        response(null, []);
    }).catch(err => {
        response.internal(err.message);
    });
};

/**
 * Show user
 *
 * @param request
 * @param response
 */
module.exports.show_user = (request, response) => {
    request.server.database.user.findOne({_id: request.params._id}, (err, user) => {
        if (err || null == user) {
            response.notFound('The user ' + request.params._id + ' cannot be found !')
        } else {
            response(null, user.toObject());
        }
    });
};

/**
 * New user
 *
 * @param request
 * @param response
 */
module.exports.new_user = (request, response) => {
    let User = new request.server.database.user;

    User.set(request.payload);
    let plainPassword = User.password;

    User.save().then(saved => {
        request.server.ioClient.emit('send-user-create',
            {
                email_address : User.email,
                login : User.login,
                plainPassword : plainPassword
            },
            (params) => {
            response(
                null,
                'User created ! ' + params.msg
            ).code(201);
        });
    }).catch(err => {
        response.internal('An error occurred while saving triggering an error : ' + err);
    });
};

/**
 * Update user
 *
 * @param request
 * @param response
 */
module.exports.update_user = (request, response) => {
    request.server.database.user.findOneAndUpdate({_id: request.params._id}, request.payload, (err, user) => {
        if (err) {
            response.internal('An error occurred while updating triggering an error : ' + err)
        } else {
            request.server.ioClient.emit('send-user-update',
                {
                    email_address : user.email,
                    id : user._id
                },
                (params) => {
                    response(
                        null,
                        'User updated ! ' + params.msg
                    ).code(200);
                });
        }
    });
};

/**
 * Delete user
 *
 * @param request
 * @param response
 */
module.exports.delete_user = (request, response) => {
    request.server.database.user.findOneAndRemove({_id: request.params._id}, err => {
        if (err) {
            response.internal('An error occurred while deleting triggering an error : ' + err);
        } else {
            response(null, 'Deleted !').code(204);
        }
    });
};

/**
 * Change user password
 *
 * @param request
 * @param response
 */
module.exports.change_password_user = (request, response) => {
    let passwords = request.payload;

    if (passwords.password == passwords.re_password) {
        let encoded = crypt.sha1(passwords.password);

        request.server.database.user.findOneAndUpdate({_id: request.params._id}, {password: encoded}, (err, user) => {
            if (err) {
                response.internal('An error occurred while updating the password triggering an error : ' + err)
            } else {
                request.server.ioClient.emit('send-user-update-password',
                    {
                        email_address : user.email,
                        login : user.login,
                        plainPassword : passwords.password
                    },
                    (params) => {
                        response(
                            null,
                            'Password Updated ! ' + params.msg
                        ).code(200);
                    });
            }
        });
    }
};

/**
 * Authenticate user
 *
 * @param request
 * @param response
 */
module.exports.authentication = (request, response) => {
    let login   = request.payload.login;
    let encoded = crypt.sha1(request.payload.password);

    request.server.database.user.findOne({login: login, password: encoded}, (err, user) => {
        console.log(user);
        if (err || null == user) {
            response.unauthorized('Bad credential');
        } else {
            response(null, { msg : 'ok' } );
        }
    });
};
