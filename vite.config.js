import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),
    // Brotli compression (better for modern browsers/Vercel)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three', 'three-stdlib'],
          'r3f-core':   ['@react-three/fiber', '@react-three/drei'],
          'r3f-post':   ['@react-three/postprocessing', 'postprocessing'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion':     ['framer-motion', 'aos'],
          'pdf-viewer': ['@react-pdf-viewer/core', '@react-pdf-viewer/default-layout', 'react-pdf'],
        },
      },
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
});
