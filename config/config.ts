import { defineConfig } from 'umi';
import routes from './routes';

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
    logo: '/e11.ico',
  },
  // 浏览器图标
  favicon: '/e11.ico',
  // 路由配置
  routes,
  // 快速刷新
  fastRefresh: {},
  // 提升打包编译速度x
  mfsu: {},
  // 启用按需加载
  dynamicImport: { loading: '@/pages/Loading' },
  // 为文件名添加hash值
  hash: true,
  // 设置路由模式
  history: {
    type: 'browser',
  },
  // dva设置
  dva: {
    // 表示是否启用 immer 以方便修改 reducer。
    immer: true,
    // 表示是否启用 dva model 的热更新。
    hmr: false,
    // 避免循环依赖导致模块 undefined 问题
    lazyLoad: true,
  },
});
