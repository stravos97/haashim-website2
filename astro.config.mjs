import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://haashim-alvi.netlify.app',
  
  compressHTML: true,
  
  build: {
    inlineStylesheets: 'auto',
    
    assets: '_assets',
  },
  
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'cv-data': ['/src/data/index'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['zod'],
    },
  },
  
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  
  devToolbar: {
    enabled: false,
  },
});
