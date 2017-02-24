'use strict';

module.exports.root = (request, response) => {
    request.server.ioClient.emit('connection', (params) => {
        response(null,  {
            result : params.msg
        });
    });
};
