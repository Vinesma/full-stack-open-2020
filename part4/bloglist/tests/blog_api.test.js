const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promises = blogObjects.map(blog => blog.save());

    await Promise.all(promises);
});

describe('fetching data from database', () => {
    test('is returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('returns all data', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('returns a specific title of a blog', async () => {
        const response = await api.get('/api/blogs');

        const titles = response.body.map(blog => blog.title);
        expect(titles).toContain('Interesting blog post');
    });
});

describe('adding blogs', () => {
    test('succeeds if valid and token is not missing', async () => {
        const newBlog = {
            title: 'Test title',
            author: 'Tester',
            url: 'http://testurl.com/post/1337',
            likes: 452,
        };

        loginResponse = await api
            .post('/api/login')
            .send({ username: "root", password: "ahoy" })
            .expect('Content-Type', /application\/json/);
        
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const dbBlogs = await helper.blogsInDb();
        expect(dbBlogs).toHaveLength(helper.initialBlogs.length + 1);

        const titles = dbBlogs.map(blog => blog.title);
        expect(titles).toContain('Test title');
    });

    test('fails if title and url are missing', async () => {
        const invalidBlog = {
            author: '',
        };

        loginResponse = await api
            .post('/api/login')
            .send({ username: "root", password: "ahoy" })
            .expect('Content-Type', /application\/json/);

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .send(invalidBlog)
            .expect(400);

        const dbBlogs = await helper.blogsInDb();

        expect(dbBlogs).toHaveLength(helper.initialBlogs.length);
    });

    test('fails if token is missing', async () => {
        const dbBlogsStart = await helper.blogsInDb();

        const newBlog = {
            title: 'Test title',
            author: 'Tester',
            url: 'http://testurl.com/post/1337',
            likes: 452,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
        
        const dbBlogsEnd = await helper.blogsInDb();
        expect(dbBlogsEnd).toHaveLength(dbBlogsStart.length);
    });
});

describe('identifier fields', () => {
    test('are named "id" and not MongoDB\'s default "_id"', async () => {
        const dbBlogs = await helper.blogsInDb();

        dbBlogs.forEach(blog => {
            expect(blog.id).toBeDefined();
        });
    });

    test('"likes" being absent defaults to 0', async () => {
        const blogWithNoLikes = new Blog({
            title: 'Test title',
            author: 'Testerman',
            url: 'http://testurl.com/',
        });

        expect(blogWithNoLikes.likes).toBe(0);
    });
});

describe('updating one item in the database', () => {
    test('succeeds with a valid id', async () => {
        const dbBlogsStart = await helper.blogsInDb();
        const blogToUpdate = dbBlogsStart[0];

        const blog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 100,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blog)
            .expect(200);

        const updatedBlog = await Blog.findById(blogToUpdate.id);

        expect(updatedBlog.likes).toBe(blogToUpdate.likes + 100);
    });
});

describe('removing from the database', () => {
    test('succeeds with a valid token and id', async () => {
        const dbBlogsStart = await helper.blogsInDb();
        const blogToDelete = dbBlogsStart[0];

        loginResponse = await api
            .post('/api/login')
            .send({ username: "root", password: "ahoy" })
            .expect('Content-Type', /application\/json/);

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${loginResponse.body.token}`)
            .expect(204);

        const dbBlogsEnd = await helper.blogsInDb();

        expect(dbBlogsEnd).toHaveLength(helper.initialBlogs.length - 1);
        expect(dbBlogsEnd).not.toContainEqual(blogToDelete);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
