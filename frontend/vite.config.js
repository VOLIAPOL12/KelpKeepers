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
        port: 5137,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',  // your backend server
                changeOrigin: true,
                secure: false,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});