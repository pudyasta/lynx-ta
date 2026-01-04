import path from 'node:path';
import { defineConfig } from '@lynx-js/rspeedy';

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { createRequire } from 'node:module';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
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
  ],
  source: {
    alias: {
      react$: require.resolve('@lynx-js/react/compat'),
      '@': path.resolve(__dirname, './src/app'),
    },
  },
  tools: {
    rspack: {
      plugins: [],
    },
  },
});
