import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist/types',
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['dist', 'node_modules']
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SilaCkTable',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@mui/material',
        '@mui/icons-material',
        '@mui/lab'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MaterialUI',
          '@mui/icons-material': 'MaterialUIIcons',
          '@mui/lab': 'MaterialUILab'
        }
      }
    }
  }
});
