const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    } else {
        request.token = null;
    }

    next();
};

module.exports = { unknownEndPoint, tokenExtractor };
