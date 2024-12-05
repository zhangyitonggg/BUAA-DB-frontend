import router from "../utils/network";
import path from "./path";

const api = {
    register: async(username, password) => { return await router.post(path.baseUrl + path.register, {username: username, password: password, email: null, student_id: null, real_name: null}); },
    login: async(username, password) => { return await router.post(path.baseUrl + path.login, {username: username, password: password, email: null}, {}); },
    getnews: async(page) => { return await router.get(path.baseUrl + path.getNews, {params:{page: page, per_page: 15}}); },
    getPosts: async(pay, sory_by, key_word) => {
        return await router.get(path.baseUrl + path.search, {params: {page: 1, per_page: 30, pay: pay, sort_by: sory_by, key_word: key_word, max_length: 30}});
    },
}

export default api;