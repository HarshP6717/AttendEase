import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory and its parent directories
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Base public path when served in production
    base: '/', // Change this if your app is served from a subdirectory
    
    // Development server configuration
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
      open: mode === 'development', // Open browser on dev server start
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      cssMinify: mode === 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor libraries into separate chunks
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          },
        },
      },
    },
    
    // Plugins
    plugins: [
      react(),
      mode === "development" && componentTagger()
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
      include: ['react', 'react-dom'],
      esbuildOptions: {
        // Enable esbuild's tree shaking
        target: 'es2020',
      },
    },
    
    // CSS configuration
    css: {
      devSourcemap: mode === 'development',
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  };
});
