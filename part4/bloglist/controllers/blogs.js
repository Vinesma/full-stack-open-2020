const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const {request, response} = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });

    response.json(
        blogs.map(blog => blog.toJSON())
    );
});

blogRouter.post('/', async (request, response) => {
    const body = request.body;

    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    try {
       var decodedToken = jwt.verify(request.token, process.env.SECRET);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return response.status(401).json({ error: 'token missing or invalid' });
        } else {
            return response.status(401).json({ error: 'unknown token error' });
        }
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });

    try {
        const result = await blog.save();
        user.blogs = user.blogs.concat(result._id);
        await user.save();
        response.status(201).json(result.toJSON());
    } catch(error) {
        if (error.name === 'ValidationError') {
            response.status(400).send({ error: error.message });
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
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    try {
       var decodedToken = jwt.verify(request.token, process.env.SECRET);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return response.status(401).json({ error: 'token missing or invalid' });
        } else {
            return response.status(401).json({ error: 'unknown token error' });
        }
    }

    blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === decodedToken.id) {
        try {
            await Blog.findByIdAndDelete(request.params.id);
            response.status(204).end();
        } catch(error) {
            response.status(400).json({ error: error.message });
        }
    } else {
        response.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = blogRouter;
