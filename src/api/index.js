import router from "../utils/network";
import path from "./path";

const api = {
    register: async(username, password) => { return await router.post(path.baseUrl + path.user.register, {username: username, password: password, email: null, student_id: null, real_name: null}); },
    login: async(username, password) => { return await router.post(path.baseUrl + path.user.login, {username: username, password: password, email: null}, {}); },
    getnews: async(page) => { return await router.get(path.baseUrl + path.billboard.getNews, {params:{page: page, per_page: 15}}); },
    getPosts: async(pay, sory_by, key_word) => { return await router.get(path.baseUrl + path.post.search, {params: {page: 1, per_page: 30, pay: pay, sort_by: sory_by, key_word: key_word, max_length: 30}}); },
    getTags: async(key_word) => {
        if (key_word) return await router.get(path.baseUrl + path.tags.search, {params: {key_word: key_word}});
        else return await router.get(path.baseUrl + path.tags.search);
    },
    createPost: async(title, content, tags, cost, link) => { return await router.post(path.baseUrl + path.post.create, {title: title, content: content, tags: tags, cost: cost, link: link}); },
    createTask: async(title, content, tags, commission) => { return await router.post(path.baseUrl + path.tasks.create, {title: title, content: content, tags: tags, commission: commission}); },
    getPostDetail: async(id) => { return await router.get(path.baseUrl + path.post.root + id); },
    getUserProfile: async(id) => { return await router.get(path.baseUrl + path.user.root + id + path.user.profile); },
    getTasks: async(pay, sory_by, key_word) => { return await router.get(path.baseUrl + path.tasks.search, {params: {page: 1, per_page: 30, pay: pay, sort_by: sory_by, key_word: key_word, max_length: 30}}); },
}

export default api;