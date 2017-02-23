'use strict';

const _ = require('lodash');

/*
 module brake pour ...
 // Possible errors
 module pour gérer les erreurs
 200: success
 201: created
 204: deleted (pas de retour dans le body)
 404: not found
 500: une erreur survenue
 401: auth error
 */

/*
 // ways to set fields

 model.set("field", value);
 // or
 model.field = value;
 // or
 model.set({
 "field" : value
 });*/

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

module.exports.show_user = (request, response) => {
    request.server.database.user.findOne({_id: request.params._id}, (err, user) => {
        if (err) {
            response.internal('The user ' + request.params._id + ' cannot be found !')
        }
        response(null, user.toObject());
    });
};

module.exports.new_user = (request, response) => {
    // let UserModel  = request.server.database.user;
    let User       = new request.server.database.user;
    let duplicated = false;

    User.set(request.payload);

    /*UserModel.find({email: User.email}).then(data => {
        return data.length > 0;
    });
    UserModel.find({login: User.login}).then(data => {
        return data.length > 0;
    });
    UserModel.find({nir: User.nir}).then(data => {
        return data.length > 0;
    });*/

    if (duplicated) {
        response.internal('Duplicated field');
    } else {
        User.save().then(saved => {
            response(null, 'Saved !');
        }).catch(err => {
            response.internal('An error occurred while saving : ' + err);
        });
    }
};

module.exports.update_user = (request, response) => {
    let UserModel = request.server.database.user;

    UserModel.findOne({_id: request.params._id}, (err, user) => {
        if (err || null == user) {
            response.notFound('The user ' + request.params._id + ' cannot be found !');
        } else {
            _.merge(user, request.payload);

            /*UserModel.exists({email: this.email}, function (err, exists) {
                if (exists)
                    return next(response.internal("Email already exists"));
                return next();
            });
            UserModel.exists({login: this.login}, function (err, exists) {
                if (exists)
                    return next(response.internal("Login already exists"));
                return next();
            });
            UserModel.exists({nir: this.nir}, function (err, exists) {
                if (exists)
                    return next(response.internal("Nir already exists"));
                return next();
            });*/

            user.save().then(saved => {
                response(null, 'Updated !');
            }).catch(err => {
                response.internal('An error occurred while updating : ' + err)
            });
        }
    });
};

module.exports.delete_user = (request, response) => {
    request.server.database.user.findOneAndRemove({_id: request.params._id}, err => {
        if (err) {
            response.internal('An error occurred while deleting : ' + err)
        }
        response(null, 'Deleted !');
    });
};
