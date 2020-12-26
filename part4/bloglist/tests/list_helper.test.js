const listHelper = require('../utils/list_helper');
const listWithOneBlog = [
    {
        _id: '58394820938132984',
        title: 'Cool blog post',
        author: 'DudeMcDudeFace',
        url: 'https://mycoolblog.com/posts/39283981',
        likes: 5,
        __v: 0,
    },
];

const bigList = [
    {
        _id: '58394820938132984',
        title: 'Cool blog post',
        author: 'DudeMcDudeFace',
        url: 'https://mycoolblog.com/posts/39283981',
        likes: 5,
        __v: 0,
    },
    {
        _id: '49283108493798139',
        title: 'Cool blog post 2',
        author: 'FaceMcFaceDude',
        url: 'https://mygreatblog.com/posts/23713',
        likes: 18,
        __v: 0,
    },
    {
        _id: '49283108493798139',
        title: 'Cool blog post 6',
        author: 'FaceMcFaceDude',
        url: 'https://myexcelentblog.com/posts/2',
        likes: 142,
        __v: 0,
    },
];

const biggerList = [
    {
        _id: '58394820938132984',
        title: 'Cool blog post',
        author: 'DudeMcDudeFace',
        url: 'https://mycoolblog.com/posts/39283981',
        likes: 6,
        __v: 0,
    },
    {
        _id: '49283108493798139',
        title: 'Cool blog post 2',
        author: 'FaceMcFaceDude',
        url: 'https://mygreatblog.com/posts/23713',
        likes: 5,
        __v: 0,
    },
    {
        _id: '49283108493798139',
        title: 'Cool blog post 3',
        author: 'FaceMcFaceDude',
        url: 'https://myexcelentblog.com/posts/2',
        likes: 6,
        __v: 0,
    },
    {
        _id: '49283108493798139',
        title: 'Cool blog post 4',
        author: 'FaceMcFaceDude',
        url: 'https://mygreatblog.com/posts/9489',
        likes: 5,
        __v: 0,
    },
];

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    test('when list is empty, equals 0', () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });

    test('when list has only one blog, equals to its single value', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test('when list is bigger, a proper sum is delivered', () => {
        const result = listHelper.totalLikes(bigList);
        expect(result).toBe(165);
    });
});

describe('favorite blog', () => {
    test('when list is empty, return null', () => {
        const result = listHelper.favoriteBlog([]);
        expect(result).toBe(null);
    });

    test('when list has one blog, return its title, author and likes', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual({
            title: 'Cool blog post',
            author: 'DudeMcDudeFace',
            likes: 5,
        });
    });

    test('when list has a clear winner, return its title, author and likes', () => {
        const result = listHelper.favoriteBlog(bigList);
        expect(result).toEqual({
            title: 'Cool blog post 6',
            author: 'FaceMcFaceDude',
            likes: 142,
        });
    });

    test('when list has many winners, return one of them', () => {
        const result = listHelper.favoriteBlog(biggerList);
        expect(result).toEqual({
            title: 'Cool blog post',
            author: 'DudeMcDudeFace',
            likes: 6,
        });
    });
});
