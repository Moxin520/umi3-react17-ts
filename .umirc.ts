import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // antd-pro 导航栏
  layout: {
    // 标题及导航名字
    name: 'Ant Design',
    // 国际化开启
    locale: true,
    // 导航栏位置
    layout: 'side',
  },
  // 路由配置
  routes: [
    {
      path: '/',
      name: '首页', // 兼容此写法
      icon: 'home',
      component: '@/pages/index',
    },
  ],
  // 快速刷新
  fastRefresh: {},
  // 提升打包编译速度x
  mfsu: {},
});
