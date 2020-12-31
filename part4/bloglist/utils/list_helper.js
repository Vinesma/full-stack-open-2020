const dummy = blogs => {
    return 1;
};

const totalLikes = blogs => {
    if (blogs.length === 0) {
        return 0;
    }

    return blogs
        .map(blog => blog.likes)
        .reduce((acc, value) => acc + value);
};

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return null;
    }

    const likes = blogs.map(blog => blog.likes);
    let maxValue = 0;
    let index = 0;

    for (let i = 0; i < likes.length; i++) {
        if (likes[i] > maxValue) {
            maxValue = likes[i];
            index = i;
        }
    }

    return {
        title: blogs[index].title,
        author: blogs[index].author,
        likes: blogs[index].likes,
    };
};

module.exports = { dummy, totalLikes, favoriteBlog };
