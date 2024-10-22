/* eslint-disable */
import api from "../api";
import test from "./test";

let flag = false;
let token = "123456789";

export default {
    // 登录
    async login(context, { username, password, remember }) {
      if (flag) {
        if (!username || !password) {
          throw "用户名或密码不合法。";
        }
        try {
          await api.login(username, password)
            .then(response => {
              store.commit('setRole', response.data.role);
              if (remember) {
                localStorage.setItem('__token__', response.data.access_token);
                localStorage.setItem('__user_name__', username);
              } else {
                sessionStorage.setItem('__token__', response.data.access_token);
                sessionStorage.setItem('__user_name__', username);
              }
            })
        } catch (error) {
          throw "用户名或密码错误。";
        }
      } else {
          if (!username || !password) {
            throw "用户名或密码不合法。";
          }
          if (remember) {
            localStorage.setItem('__token__', token);
            localStorage.setItem('__user_name__', username);
          } else {
            sessionStorage.setItem('__token__', token);
            sessionStorage.setItem('__user_name__', username);
          }
        }
    },
    // 注册
    async register(context, { username, password }) {
      if (flag) {
        return new Promise((resolve, reject) => {
          api.register(username, password)
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            })
        })
      } 
    },
    // 获取公告
    async getNews(context, { page }) {
      if (flag) {
        return new Promise((resolve, reject) => {
          api.getnews(page)
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            })
        })
      } else {
        if (page == 1) {
          return test.allNews.first;
        } else if (page == 2) {
          return test.allNews.second;
        } else {
          throw "没有更多公告了。";
        }
      }
    },
    // 搜索帖子
    async getPosts(context, {tags, pay, sory_by, key_word}) {
      if (flag) {
        return new Promise((resolve, reject) => {
          api.searchResources(tags, pay, sory_by, key_word)
            .then(response => {
              resolve(response.data.posts);
            })
            .catch(error => {
              reject(error);
            })
        })
      } else {
        return test.getPosts;
      }
    }
  };
  