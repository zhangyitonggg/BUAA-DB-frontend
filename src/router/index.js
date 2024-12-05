import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/'
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue'),
    meta: {
      requiresAuthed: true,
      title: '测试'
    }
  },
  // 管理员
  {
    path: '/admin/userManage',
    name: 'user-manage',
    component: () => import('../views/Admin/UserManageView.vue'),
    meta: {
      requiresAuthed: true,
      title: '用户管理'
    }
  },
  {
    path: '/admin/newsManage',
    name: 'news-manage',
    component: () => import('../views/Admin/NewsManageView.vue'),
    meta: {
      requiresAuthed: true,
      title: '公告管理'
    }
  },
  {
    path: '/admin/shareManage',
    name: 'share-manage',
    component: () => import('../views/Admin/ShareManageView.vue'),
    meta: {
      requiresAuthed: true,
      title: '分享管理'
    }
  },
  {
    path: '/admin/taskManage',
    name: 'task-manage',
    component: () => import('../views/Admin/TaskManageView.vue'),
    meta: {
      requiresAuthed: true,
      title: '悬赏管理'
    }
  },
  // 普通用户
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth/AuthView.vue'),
    meta: {
      requiresNotAuthed: true,
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/HomeView.vue'),
    meta: {
      requiresAuth: true,
      title: '首页'
    }
  },
  {
    path: '/resources',
    name: 'resources',
    component: () => import('../views/Resources/ResourcesView.vue'),
    meta: {
      requiresAuth: true,
      title: '共享资源'
    }
  },
  {
    path: '/resources/share',
    name: 'add-resource',
    component: () => import('../views/Resources/Add/ShareResourceView.vue'),
    meta: {
      requiresAuth: true,
      title: '共享资源'
    }
  },
  {
    path: '/resources/own',
    name: 'own-resource',
    component: () => import('../views/Resources/Own/OwnResourceView.vue'),
    meta: {
      requiresAuth: true,
      title: '共享资源'
    }
  },
  {
    path: '/resources/:id',
    name: 'get-resource',
    component: () => import('../components/Share/SharePost.vue'),
    meta: {
      requiresAuth: true,
      title: '共享资源'
    }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/Tasks/TasksView.vue'),
    meta: {
      requiresAuth: true,
      title: '悬赏'
    },
  },
  {
    path: '/tasks/add',
    name: 'add-task',
    component: () => import('../views/Tasks/Add/AddTaskView.vue'),
    meta: {
      requiresAuth: true,
      title: '添加悬赏'
    }
  },
  {
    path: '/tasks/own',
    name: 'own-task',
    component: () => import('../views/Tasks/Own/OwnTaskView.vue'),
    meta: {
      requiresAuth: true,
      title: '我的悬赏'
    }
  },
  {
    path: '/tasksForAsker/testPostForAsker', // 测试用,后面换成/tasksForAsker/:id
    name: 'get-task-test',
    component: () => import('../components/Task/TaskPostForAsker.vue'),
    meta: {
      requiresAuth: true,
      title: '悬赏详情'
    }
  },
  {
    path: '/tasks/testPostForOther', // 测试用,后面换成/tasksForOther/:id
    name: 'get-task',
    component: () => import('../components/Task/TaskPostForOther.vue'),
    meta: {
      requiresAuth: true,
      title: '悬赏详情'
    }
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('../views/Center/CenterView.vue'),
    meta: {
      requiresAuth: true,
      title: '个人中心'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About/AboutView.vue'),
    meta: {
      requiresAuth: false,
      title: '关于我们'
    }
  },
  {
    path: '/giveMeMoney',
    name: 'giveMeMoney',
    component: () => import('../components/Home/GiveMeMoney.vue'),
    meta: {
      requiresAuth: false,
      title: '关于我们'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit("getUserName");
  store.commit("getToken");
  const name = store.state._user_name_;
  const token = store.state._token_;
  const default_title = '航 U 邦';
  const title = to.meta == null ? "" : to.meta.title + " | ";
  if (name == null || token == null) {
    localStorage.removeItem('__user_name__');
    sessionStorage.removeItem('__user_name__');
    store.commit("hidePlatformFrame");
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next('/auth');
    } else {
      document.title = title + default_title;
      next();
    }
  } else {
    store.commit("showPlatformFrame");
    if (to.matched.some(record => record.meta.requiresNotAuthed)) {
      next('/home');
    } else {
      document.title = title + default_title;
      next();
    }
  }
});

export default router
