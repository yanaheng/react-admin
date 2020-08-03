const routes = [
  {
    path: '/login',
    component: '@/pages/login/index.tsx',
    hidden: true
  },
  {
    path: '/',
    exact: false,
    component: '@/layouts/basicLayout/index',
    routes: [
      {
        path: '/home',
        component: '@/pages/home/index',
        menu: {
          name: '首页',
        },
      },
      {
        path: '/plugins',
        exact: false,
        component: '@/layouts/blankLayout/index',
        menu: {
          name: '插件',
        },
        routes: [
          {
            path: '/plugins/braftEditor',
            component: '@/pages/plugins/braftEditor/index',
            menu: {
              name: '富文本编辑器',
            }
          }
        ]
      },
    ],
  },
];

export default routes;
