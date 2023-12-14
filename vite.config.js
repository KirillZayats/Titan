import { resolve } from 'path';
import { defineConfig } from "vite";

export default defineConfig({
   base: './',
   publicDir: true,
   build: {
     sourcemap: true,
      rollupOptions: {
      input: {
         home: resolve(__dirname, 'index.html')      
        },
      output: {
         assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(-1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
               extType = 'img';
            }
            return `${extType}/[name]-[hash][extname]`;
         },
         chunkFileNames: 'js/[name]-[hash].js',
         entryFileNames: 'js/[name]-[hash].js',
      },
   },
   },
   css: {
     devSourcemap: true
   }
});