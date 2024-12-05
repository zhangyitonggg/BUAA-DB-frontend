import api from "../api";

export default {
  // 登录
  async login(context, { username, password, remember }) {
    return await api.login(username, password)
      .then(response => {
        if (remember) localStorage.setItem('__user_name__', username);
        else sessionStorage.setItem('__user_name__', username);
        return response;
      })
      .catch(error => { throw error; });
  },
  // 注册
  async register(context, { username, password }) { return await api.register(username, password) },
  // 获取公告
  async getNews(context, { page }) { return await api.getnews(page); },
  // 搜索帖子
  async getPosts(context, {tags, pay, sory_by, key_word}) { return await api.searchResources(tags, pay, sory_by, key_word); },
};
