"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_vue_1 = require("@vitejs/plugin-vue");
var path_1 = require("path");
exports.default = (0, vite_1.defineConfig)(function (_a) {
    var command = _a.command;
    return {
        plugins: [(0, plugin_vue_1.default)()],
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
                    target: "http://centos7:10004",
                    changeOrigin: true,
                    rewrite: function (path) { return path.replace(/^\/api/, ""); },
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
                "@": path_1.default.resolve(__dirname, "./src"),
            },
        },
    };
});
