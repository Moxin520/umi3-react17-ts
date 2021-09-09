export default [
  {
    // 不展示顶栏
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    hideChildrenInMenu: true,
    // 隐藏自己和子菜单
    hideInMenu: true,
    // 在面包屑中隐藏
    hideInBreadcrumb: true,
    path: '/Login',
    component: '@/pages/Login/index',
  },
  {
    path: '/',
    name: '首页', // 兼容此写法
    icon: 'home',
    wrappers: ['@/wrappers/auth'],
    component: '@/pages/index',
  },
  {
    path: '/PersonalInformation',
    name: '个人信息', // 兼容此写法
    icon: 'home',
    component: '@/pages/PersonalInformation/index',
    hideInMenu: true,
    wrappers: ['@/wrappers/auth'],
  },
  {
    path: '/Learn',
    name: '学习天地',
    icon: 'home',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        path: '/Learn/HowToUseDva',
        name: 'dva使用', // 兼容此写法
        component: '@/pages/HowToUseDva/index',
        wrappers: ['@/wrappers/auth'],
      },
      {
        path: '/Learn/SimpleCase',
        name: '简单案例', // 兼容此写法
        component: '@/pages/SimpleCase/index',
        wrappers: ['@/wrappers/auth'],
      },
    ],
  },
  {
    path: '/Work',
    name: '工作用例',
    icon: 'home',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        path: '/Work/CanvasHat',
        name: 'canvas画帽子', // 兼容此写法
        component: '@/pages/CanvasHat/index',
        wrappers: ['@/wrappers/auth'],
      },
    ],
  },

  { component: '@/pages/404', wrappers: ['@/wrappers/auth'] },
];
