const blogRouter = require('express').Router();
const {request, response} = require('express');
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

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
        response.json(updatedBlog.toJSON());
    } catch(error) {
        response.status(400).json({ error: error.message });
    }
});

blogRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch(error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = blogRouter;
