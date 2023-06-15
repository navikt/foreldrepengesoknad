// vite.config.ts
import { defineConfig } from "file:///C:/code/foreldrepengesoknad/node_modules/.pnpm/vite@4.3.2_@types+node@18.15.11_less@4.1.3_sass@1.62.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/code/foreldrepengesoknad/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.3.2/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import checker from "file:///C:/code/foreldrepengesoknad/node_modules/.pnpm/vite-plugin-checker@0.5.6_typescript@5.0.4_vite@4.3.2/node_modules/vite-plugin-checker/dist/esm/main.js";
var __vite_injected_original_dirname = "C:\\code\\foreldrepengesoknad\\apps\\svangerskapspengesoknad";
var vite_config_default = defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}"
    }),
    checker({ typescript: true })
  ],
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      app: path.resolve(__vite_injected_original_dirname, "./src/app"),
      common: path.resolve(__vite_injected_original_dirname, "./src/common/")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest/setupTests.ts",
    coverage: {
      include: ["src/**/*"],
      exclude: []
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxjb2RlXFxcXGZvcmVsZHJlcGVuZ2Vzb2tuYWRcXFxcYXBwc1xcXFxzdmFuZ2Vyc2thcHNwZW5nZXNva25hZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcY29kZVxcXFxmb3JlbGRyZXBlbmdlc29rbmFkXFxcXGFwcHNcXFxcc3ZhbmdlcnNrYXBzcGVuZ2Vzb2tuYWRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2NvZGUvZm9yZWxkcmVwZW5nZXNva25hZC9hcHBzL3N2YW5nZXJza2Fwc3Blbmdlc29rbmFkL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHJlYWN0KHtcbiAgICAgICAgICAgIGluY2x1ZGU6ICcqKi8qLntqc3gsdHN4fScsXG4gICAgICAgIH0pLFxuICAgICAgICBjaGVja2VyKHsgdHlwZXNjcmlwdDogdHJ1ZSB9KSxcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIGFwcDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2FwcCcpLFxuICAgICAgICAgICAgY29tbW9uOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29tbW9uLycpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgdGVzdDoge1xuICAgICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICAgICAgc2V0dXBGaWxlczogJy4vdml0ZXN0L3NldHVwVGVzdHMudHMnLFxuICAgICAgICBjb3ZlcmFnZToge1xuICAgICAgICAgICAgaW5jbHVkZTogWydzcmMvKiovKiddLFxuICAgICAgICAgICAgZXhjbHVkZTogW10sXG4gICAgICAgIH0sXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxhQUFhO0FBSnBCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxNQUNGLFNBQVM7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELFFBQVEsRUFBRSxZQUFZLEtBQUssQ0FBQztBQUFBLEVBQ2hDO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxXQUFXO0FBQUEsRUFDZjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQ3hDLFFBQVEsS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxJQUNuRDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNGLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxNQUNOLFNBQVMsQ0FBQyxVQUFVO0FBQUEsTUFDcEIsU0FBUyxDQUFDO0FBQUEsSUFDZDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
