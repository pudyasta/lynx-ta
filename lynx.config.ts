import { defineConfig } from '@lynx-js/rspeedy';

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { createRequire } from 'node:module';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';

const require = createRequire(import.meta.url);

export default defineConfig({
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
    },
  },
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
        }),
      ],
    },
  },
});
