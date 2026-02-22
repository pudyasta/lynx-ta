import path from 'node:path';
import { defineConfig } from '@lynx-js/rspeedy';

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@login': path.resolve(__dirname, './src/views/Login'),
    },
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        return `${url}?fullscreen=false?`;
      },
    }),
    pluginReactLynx(),
    pluginTypeCheck(),
    pluginTypedCSSModules(),
  ],
  output: {
    filename: {
      svg: 'assets/images/[name].[hash:8].[ext]',
    },
    dataUriLimit: 0,
  },
  tools: {
    rspack: {
      plugins: [],
    },
  },
});
