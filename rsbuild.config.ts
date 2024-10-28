import { defineConfig } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import path from 'path';

export default defineConfig({
  source: {
    include: [path.dirname(require.resolve('vue-pdf'))],
    alias: {
      'worker-loader': require.resolve('worker-rspack-loader')
    },
    define: {
      'process.env.VUE_ENV': JSON.stringify('browser'),
    },
  },
  plugins: [pluginVue2()],
  tools: {
    rspack(config, { addRules }) {
      addRules([
        {
          test: /\.pdf$/,
          // 将资源转换为单独的文件，并且导出产物地址
          type: 'asset/resource',
        },
        {
          test: /\.worker\.js$/,
          loader: 'worker-rspack-loader',
        },
      ]);

    }
  }
});
