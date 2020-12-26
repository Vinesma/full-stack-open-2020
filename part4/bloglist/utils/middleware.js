const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
};

module.exports = { unknownEndPoint };
