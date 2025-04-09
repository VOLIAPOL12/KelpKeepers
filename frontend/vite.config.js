// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://localhost:5000'
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});