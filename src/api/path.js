const base = {
    baseUrl: 'http://localhost:8000',
    user: {
        root: '/user/',
        register: '/user/register/',
        login: '/user/login/',
        profile: '/profile/',
    },
    billboard: {
        getNews: '/billboard/index',
        getDetail: '/billboard/',
    },
    post: {
        root: '/post/',
        search: '/post/search',
        create: '/post/create',
        comments: 'comments',
        creatComment: 'comments/create',
        favor: '/favor',
        like: '/like',
    },
    tags: {
        search: '/tags/search',
    },
    tasks: {
        root: '/mission/',
        search: '/mission/search',
        create: '/mission/create',
        comments: 'comments',
        creatComment: 'comments/create',
        favor: '/favor',
    },
}

export default base;