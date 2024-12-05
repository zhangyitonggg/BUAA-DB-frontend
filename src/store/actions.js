import api from "../api";

export default {
  async login(context, { username, password, remember }) {
    return await api.login(username, password)
      .then(response => {
        if (remember) {
          localStorage.setItem('__user_name__', username);
          localStorage.setItem('_user_role_', response.role);
          localStorage.setItem('_user_id_', response.user_id);
        } else {
          sessionStorage.setItem('__user_name__', username);
          sessionStorage.setItem('_user_role_', response.role);
          sessionStorage.setItem('_user_id_', response.user_id);
        }
        return response;
      })
      .catch(error => { throw error; });
  },
  async register(context, { username, password }) { return await api.register(username, password) },
  async getNews(context, { page }) { return await api.getnews(page); },
  async getPosts(context, {tags, pay, sory_by, key_word}) { return await api.getPosts(tags, pay, sory_by, key_word); },
  async getTags(context, {key_word}) { return await api.getTags(key_word); },
  async createPost(context, {title, content, tags, cost, link}) { return await api.createPost(title, content, tags, cost, link); },
  async getPost(context, {id}) { return await api.getPostDetail(id); },
  async getUserProfile(context, {id}) { return await api.getUserProfile(id); },
  async getTasks(context, {tags, pay, sory_by, key_word}) { return await api.getTasks(tags, pay, sory_by, key_word); },
  async createTask(context, {title, content, tags, commission}) { return await api.createTask(title, content, tags, commission); },
  async likePost(context, {id}) { return await api.likePost(id); },
  async dislikePost(context, {id}) { return await api.dislikePost(id); },
  async notLikePost(context, {id}) { return await api.notLikePost(id); },
  async notDislikePost(context, {id}) { return await api.notDislikePost(id); },
  async favourPost(context, {id}) { return await api.favourPost(id); },
  async notFavourPost(context, {id}) { return await api.notFavourPost(id); },
  async getPostComments(context, {id}) { return await api.getPostComments(id); },
  async followUser(context, {id}) { return await api.followUser(id); },
  async notFollowUser(context, {id}) { return await api.notFollowUser(id); },
};
