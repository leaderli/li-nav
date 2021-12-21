/* eslint-disable @typescript-eslint/no-var-requires */
const { createTestingPinia } = require('@pinia/testing');

const { config } = require('@vue/test-utils');
const ElementPlus = require ("element-plus");

config.global.stubs = {};
config.global.plugins = [createTestingPinia(),ElementPlus]; //vue组件的全局配置文件

process.addListener('unhandledRejection', (err) => console.error(err));

