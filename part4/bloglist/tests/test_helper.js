const Blog = require('../models/blog');

const initialBlogs = [
    {
        title:"Interesting blog post",
        author :"DudeMcDudeFace",
        url :"https://mycoolblog.com/post/32882",
    },
    {
        title :"How to do all the stuff",
        author :"FaceMcDudeFace",
        url :"https://myawesomeblog.com/post/38123",
    },
];

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon',
        author: 'redacted',
        url: '',
    });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, nonExistingId, blogsInDb };
