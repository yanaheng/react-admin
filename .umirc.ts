import { defineConfig } from 'umi';
import routes from './config/route.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {},
  routes,
});
