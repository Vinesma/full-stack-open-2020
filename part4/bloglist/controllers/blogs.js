const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});

    response.json(
        blogs.map(blog => blog.toJSON())
    );
});

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);

    try {
        const result = await blog.save();
        response.status(201).json(result.toJSON());
    } catch(error) {
        if (error.name === 'ValidationError') {
            response.status(400).send({ error: 'Validation error!' });
        } else {
            response.json({ error: error.message });
        }
    }
});

module.exports = blogRouter;
