'use strict';

module.exports.root = (request, response) => {
    response(null,  {
        result : 'Welcome on hapi-boilerplate, your next step is on /documentation'
    });
};
