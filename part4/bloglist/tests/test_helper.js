const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: "Interesting blog post",
        author: "DudeMcDudeFace",
        url: "https://mycoolblog.com/post/32882",
        user: "60171ebc89c7cd94494251cc"
    },
    {
        title: "How to do all the stuff",
        author: "FaceMcDudeFace",
        url: "https://myawesomeblog.com/post/38123",
        user: "60171ebc89c7cd94494251cc"
    },
];

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon',
        author: 'redacted',
        url: '',
        user: null,
    });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
};
