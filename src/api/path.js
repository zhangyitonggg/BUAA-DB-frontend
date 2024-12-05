const base = {
    baseUrl: 'http://localhost:8000',
    user: {
        root: '/user/',
        register: '/user/register/',
        login: '/user/login/',
        profile: '/profile/',
        follow: '/follow/',
        not_follow: '/not_follow/',
        follows: '/follows/',
        modify: '/modify/',
    },
    billboard: {
        getNews: '/billboard/index',
        getDetail: '/billboard/',
    },
    post: {
        root: '/post/',
        search: '/post/search',
        create: '/post/create',
        comments: '/comments',
        creatComment: '/comments/create/',
        favour: '/favour',
        not_favour: '/not_favour',
        like: '/like',
        not_like: '/not_like',
        dislike: '/dislike',
        not_dislike: '/not_dislike',
        own: '/post/own',
    },
    tags: {
        search: '/tags/search',
    },
    tasks: {
        root: '/mission/',
        search: '/mission/search',
        create: '/mission/create/',
        comments: 'comments',
        creatComment: 'comments/create',
        favor: '/favor',
    },
}

export default base;