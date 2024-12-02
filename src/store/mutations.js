export default {
  // 设置身份
  setRole(state, role) {
    state._role = role;
  },
  // 检查Token
  checkToken(state) {
    if (!state._user_name_ || state._user_name_ === "UnauthorizedUser") {
      state._show_platform_frame_ = false;
    setAppTitle(state, title) {
      state._app_title_ = title;
  },
  // 注销账户
  clearPersonalInfo(state) {
    state._user_name_ = null;
    state._token_ = null;
    localStorage.removeItem('__token__');
    localStorage.removeItem('__user_name__');
    sessionStorage.removeItem('__token__');
    sessionStorage.removeItem('__user_name__');
  },
  // 设置是否查看我的收藏
  setMyFavorite(state, myFavorite) {
    state.myFavorite = myFavorite;
  },
  // 从 cookie 中获取Token
  getToken(state) {
    let session = document.cookie.split('; ').find(row => row.startsWith('session='));
    if (session) {
      session = session.split('=')[1];
      state._token_ = session;
    } else state._token_ = null;
  },
  // 从本地存储中获取用户名
  getUserName(state) {
    let user_name = localStorage.getItem('__user_name__');
    if (!user_name) {
      user_name = sessionStorage.getItem('__user_name__');
    } state._user_name_ = user_name;
  },
  // 设置是否显示颗粒
  setParticles(state, payload) {
    state.hasParticles = payload;
  },
  // 显示警告
  setAlert(state, alert) {
    state._alert_.message = alert.message;
    if (alert.type) {
      state._alert_.type = alert.type;
      state._alert_.show = state._alert_.show + 1;
      setTimeout(() => {
        state._alert_.show = state._alert_.show - 1;
      }, 2000);
    } else {
      state._alert_.show = state._alert_.show - 1;
    }
  },
  // 显示导航栏
  showPlatformFrame(state) {
    state._show_platform_frame_ = true;
  },
  // 隐藏导航栏
  hidePlatformFrame(state) {
    state._show_platform_frame_ = false;
  },
  // 设置页面标题
  setAppTitle(state, title) {
    state._app_title_ = title;
  },
  // 注销账户
  clearPersonalInfo(state) {
    state._user_name_ = null;
    state._token_ = null;
    localStorage.removeItem('__user_name__');
    sessionStorage.removeItem('__user_name__');
    document.cookie = "";
  }
};
