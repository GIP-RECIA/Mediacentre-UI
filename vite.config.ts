import pkg from './package.json';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_BASE_URI,
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) =>
              [
                'mediacentre-ui',
                'page-mediacentre',
                'menu-mediacentre',
                'liste-ressources',
                'carte-ressource',
                'info-modal',
              ].includes(tag),
          },
        },
      }),
      VueI18nPlugin({}),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      hmr: {
        path: 'ws',
      },
    },
    build: {
      lib: {
        entry: './src/main.ts',
        name: pkg.name,
      },
      sourcemap: true,
    },
    define: {
      'process.env': process.env,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/global.scss";`,
        },
      },
    },
  });
};
