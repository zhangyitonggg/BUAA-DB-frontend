import router from "./network";
import path from "./path";

const api = {
    register: async(username, password) => { return await router.post(path.baseUrl + path.user.register, {username: username, password: password, email: null, student_id: null, real_name: null}); },
    login: async(username, password) => { return await router.post(path.baseUrl + path.user.login, {username: username, password: password, email: null}, {}); },
    getnews: async(page) => { return await router.get(path.baseUrl + path.billboard.getNews, {params:{page: page, per_page: 15}}); },
    getPosts: async(pay, sory_by, key_word, tags) => { return await router.get(path.baseUrl + path.post.search, {params: {page: 1, per_page: 30, pay: pay, sort_by: sory_by, key_word: key_word, max_length: 30, tags: tags}}); },
    getTags: async(key_word) => {
        if (key_word) return await router.get(path.baseUrl + path.tags.search, {params: {key_word: key_word}});
        else return await router.get(path.baseUrl + path.tags.search);
    },
    createPost: async(title, content, tags, cost, link) => { return await router.post(path.baseUrl + path.post.create, {title: title, content: content, tags: tags, cost: cost, bhpan_url: link}); },
    createTask: async(title, content, tags, commission) => { return await router.post(path.baseUrl + path.tasks.create, {title: title, content: content, tags: tags, commission: commission}); },
    getPostDetail: async(id) => { return await router.get(path.baseUrl + path.post.root + id); },
    getUserProfile: async(id) => { return await router.get(path.baseUrl + path.user.root + id + path.user.profile); },
    getTasks: async(pay, sory_by, key_word) => { return await router.get(path.baseUrl + path.tasks.search, {params: {page: 1, per_page: 30, pay: pay, sort_by: sory_by, key_word: key_word, max_length: 30}}); },
    likePost: async(id) => { return await router.post(path.baseUrl + path.post.root + id + path.post.like)},
    notLikePost: async(id) => { return await router.post(path.baseUrl + path.post.root + id + path.post.not_like)},
    dislikePost: async(id) => { return await router.post(path.baseUrl + path.post.root + id + path.post.dislike)},
    notDislikePost: async(id) => { return await router.post(path.baseUrl + path.post.root + id + path.post.not_dislike)},
    favourPost: async(id) => { return await router.post(path.baseUrl + path.post.root + id + path.post.favour)},
    notFavourPost: async(id) => { return await router.post(path.baseUrl + path.post.root + id + path.post.not_favour)},
    getPostComments: async(id) => { return await router.get(path.baseUrl + path.post.root + id + path.post.comments)},
    followUser: async(id) => { return await router.post(path.baseUrl + path.user.root + id + path.user.follow)},
    notFollowUser: async(id) => { return await router.post(path.baseUrl + path.user.root + id + path.user.not_follow)},
    createComment: async(id, content, parent_id) => { return await router.post(path.baseUrl + path.post.root + id + path.post.creatComment, {content: content, parent_id: parent_id}); },
    getFollows: async(id) => { return await router.get(path.baseUrl + path.user.root + id + path.user.follows); },
    ownPosts: async() => { return await router.get(path.baseUrl + path.post.own); },
    modifyUser: async(id, password, email, signature) => { return await router.post(path.baseUrl + path.user.root + id + path.user.modify, {password: password, email: email, signature: signature}); },
}

export default api;