import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
            //访问地址配置
            host: "0.0.0.0",
            //端口
            port: 10002,
            //是否使用https
            https: false,
            //启动后自动打开浏览器
            open: false,

            //代理配置，
            proxy: {
                "/api": {
                    target: "",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },

            hmr: {
                //是否屏蔽服务器保持
                overlay: false,
            },
        },
        //设置项目文件路径，以项目根目录文起点
        resolve: {
            //设置项目文件路径的别名
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
})
