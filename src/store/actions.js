import api from "../api";

export default {
  async login(context, { username, password, remember }) {
    return await api.login(username, password)
      .then(response => {
        if (remember) localStorage.setItem('__user_name__', username);
        else sessionStorage.setItem('__user_name__', username);
        return response;
      })
      .catch(error => { throw error; });
  },
  async register(context, { username, password }) { return await api.register(username, password) },
  async getNews(context, { page }) { return await api.getnews(page); },
  async getPosts(context, {tags, pay, sory_by, key_word}) { return await api.getPosts(tags, pay, sory_by, key_word); },
  async getTags(context, {key_word}) { return await api.getTags(key_word); },
  async createPost(context, {title, content, tags, cost, link}) { return await api.createPost(title, content, tags, cost, link); },
};
