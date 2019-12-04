import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const commonRouters = [
  {
    path: '/',
    redirect: 'home'
  }
];

export const asyncRouters = {
  'home': {
    path: 'home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  't1': {
    path: 't1',
    name: 't1',
    component: () => import('@/views/T1.vue')
  },
  'od': {
    path: 'od',
    name: 'od',
    component: () => import('@/views/ODpoint.vue')
  },
  'trajectory': {
    path: 'trajectory',
    name: 'trajectory',
    component: () => import('@/views/Trajectory.vue')
  },
  'prediction': {
    path: 'prediction',
    name: 'prediction',
    component: () => import('@/views/Prediction.vue')
  },
  'about': {
    path: 'about',
    name: 'about',
    component: () => import('@/views/About.vue')
  }
};

const createRouter = () => new Router({
  routes: commonRouters
});

export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

const router = createRouter();

export default router;

