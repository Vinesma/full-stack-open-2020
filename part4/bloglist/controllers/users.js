const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const {request, response} = require('express');
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
    const users = await User.find({});

    response.json(
        users.map(user => user.toJSON())
    );
});

userRouter.post('/', async (request, response) => {
    const body = request.body;

    if (body.password.length < 3) {
        response.status(400).send({ error: "Password should have at least 3 characters" })
    } else {
        const saltRounds = 9;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            name: body.name,
            username: body.username,
            passwordHash,
        });

        try {
            const newUser = await user.save();
            response.status(201).json(newUser);
        } catch (error) {
            response.status(400).send({ error: `${error.message}` })
        } 
    }
})

module.exports = userRouter;
