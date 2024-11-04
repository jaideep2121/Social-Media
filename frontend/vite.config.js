import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  build: { manifest: true, outDir: './dist'},

  server: {
	
		proxy: {
			"/api": {
				target: "https://logo-media-i3uh.onrender.com",
			},
		},
	},

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})