const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);

const User = require('../models/user');

describe('when there is only one user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('ahoy', 9);
        const user = new User({
            name: 'Root',
            username: 'root',
            passwordHash
        });

        await user.save();
    });

    test('creating a user succeeds with a fresh username', async () => {
        const dbUserStart = await helper.usersInDb();

        const newUser = {
            username: 'vinesma',
            name: 'Otavio C.',
            password: 'shAhoy',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const dbUserEnd = await helper.usersInDb();
        expect(dbUserEnd).toHaveLength(dbUserStart.length + 1);

        const usernames = dbUserEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creating a user fails with a username that is already taken', async () => {
        const dbUserStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'NeoRoot',
            password: 'testing',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const dbUserEnd = await helper.usersInDb();
        expect(dbUserEnd).toHaveLength(dbUserStart.length);
    });

    test('creating a user with a short username fails', async () => {
        const dbUserStart = await helper.usersInDb();

        const newUser = {
            username: 'hx',
            name: 'Hax',
            password: 'testing',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(result.body.error).toContain('User validation failed: username');
        
        const dbUserEnd = await helper.usersInDb();
        expect(dbUserEnd).toHaveLength(dbUserStart.length);
    });

    test('creating a user with a short password fails', async () => {
        const dbUserStart = await helper.usersInDb();

        const newUser = {
            username: 'hexx',
            name: 'Hax',
            password: 'ts',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(result.body.error).toContain('Password should have at least 3 characters');
        
        const dbUserEnd = await helper.usersInDb();
        expect(dbUserEnd).toHaveLength(dbUserStart.length);
    });
});
