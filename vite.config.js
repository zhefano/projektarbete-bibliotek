import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        books: 'books.html',
        register: 'regi.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});