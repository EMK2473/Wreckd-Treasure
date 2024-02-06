import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
     plugins: [react()],
     build: {
          base: "./",//add this line
          outDir: "dist",//output directory for the build
          emptyOutDir: true, //empty the output directory when the build starts
     },
     server: {
          port: 3000,
          open: true,
          proxy: {
               "/graphql": {
                    target: "http://localhost:3001",
                    secure: false,
                    changeOrigin: true,
               },
          },
     },
});