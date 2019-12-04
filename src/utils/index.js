import {asyncRouters} from '@/router';

export function menusToRouters (data) {
  const res = [];
  const children = [];

  res.push({
    path: '/',
    component: () => import('@/components/Index.vue'),
    children,
  });

  data.forEach(item => {
    generateRouters(children, item);
  });

  children.push({
    path: 'error',
    name: 'error',
    component: () => import('@/components/Error.vue')
  });

  // 最后添加404页面
  res.push(
    {path: '*', redirect: '/error'},
  );

  return res;
}

function generateRouters (children, item) {
  if (item.name) {
    children.push(asyncRouters[item.name]);
  } else if (item.children) {
    item.children.forEach(e => {
      generateRouters(children, e);
    });
  }
}
