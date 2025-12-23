import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory and its parent directories
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';

  return {
    // Base public path when served in production
    base: isProduction ? '/' : '/',
    
    // Development server configuration
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
      open: !isProduction,
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      cssMinify: isProduction,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          },
        },
      },
      // Ensure proper chunking for Vercel
      chunkSizeWarningLimit: 1000,
    },
    
    // Plugins
    plugins: [
      react({
        // Enable Fast Refresh
        jsxImportSource: '@emotion/react',
        tsDecorators: true,
      }),
      !isProduction && componentTagger()
    ].filter(Boolean),
    
    // Module resolution
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    
    // Environment variables
    define: {
      'process.env': {}
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu'
      ],
      esbuildOptions: {
        target: 'es2020',
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
    
    // CSS configuration
    css: {
      devSourcemap: !isProduction,
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables";`
        }
      }
    },
    
    // Handle Vercel rewrites for SPA routing
    preview: {
      port: 8080,
      strictPort: true,
    },
  };
});
