const base = {
    baseUrl: 'http://localhost:8000',
    user: {
        register: '/user/register/',
        login: '/user/login/',
    },
    billboard: {
        getNews: '/billboard/index',
        getDetail: '/billboard/',
    },
    post: {
        search: '/post/search',
        create: '/post/create',
        detail: '/post/',
        comments: 'comments',
        creatComment: 'comments/create',
        favor: 'favor',
    },
    tags: {
        search: '/tags/search',
    }
}

export default base;