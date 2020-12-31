const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific title of a blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map(blog => blog.title);
    expect(titles).toContain('Interesting blog post');
});


test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Test title',
        author: 'Tester',
        url: 'http://testurl.com/post/1337',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const response = await helper.blogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length + 1);

    const titles = response.map(blog => blog.title);
    expect(titles).toContain('Test title');
});

test('blog without title and url is not added', async () => {
    const invalidBlog = {
        author: '',
    }

    await api
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)

    const response = await helper.blogsInDb();

    expect(response).toHaveLength(helper.initialBlogs.length);
});

test('identifier field is named "id" and not MongoDB\'s default "_id"', async () => {
    const response = await helper.blogsInDb();

    response.forEach(blog => {
        expect(blog.id).toBeDefined();
    });
});

afterAll(() => {
    mongoose.connection.close();
});
