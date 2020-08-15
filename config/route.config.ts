
const routes = [
  {
    path: '/login',
    component: '@/pages/login/index.tsx',
    hidden: true,
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
          icon: 'icon-shouye'
        },
      },
      {
        path: '/plugins',
        exact: false,
        component: '@/layouts/blankLayout/index',
        menu: {
          name: '插件',
          icon: 'icon-chajian'

        },
        routes: [
          {
            path: '/plugins/braftEditor',
            component: '@/pages/plugins/braftEditor/index',
            menu: {
              name: '富文本编辑器',
            },
          },
          {
            path: '/plugins/reactAmap',
            component: '@/pages/plugins/reactAmap/index',
            menu: {
              name: '高德地图',
            },
          },
          {
            path: '/plugins/splitPane',
            component: '@/pages/plugins/splitPane/index',
            menu: {
              name: 'splitPane',
            },
          },
          {
            path: '/plugins/markDown',
            component: '@/pages/plugins/markDown/index',
            menu: {
              name: 'markDown',
            },
          },
          {
            path: '/plugins/jsonEditor',
            component: '@/pages/plugins/jsonEditor/index',
            menu: {
              name: 'jsonEditor',
            },
          },
          {
            path: '/plugins/excels',
            component: '@/pages/plugins/excels/index',
            menu: {
              name: 'excels',
            },
          },
          {
            path: '/plugins/reactDnd',
            component: '@/pages/plugins/reactDnd/index',
            menu: {
              name: '拖拽',
            }
          }
        ],
      },
      {
        path: '/css',
        component: '@/pages/css/index',
        menu: {
          name: 'css',
          icon: 'icon-CSSyangshi'

        },
      },
    ],
  },
];

export default routes;
