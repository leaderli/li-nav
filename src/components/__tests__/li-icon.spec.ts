import { mount } from '@vue/test-utils';

import about from '../li-nav-card.vue';

test('displays message', () => {
    const wrapper = mount(about, {

        // 模拟父组件传递数据
        props:{
            bookmark:{
                index: 1,
                title: 'jest',
                url: 'http://jest',
                tags: ['jest','babel'],
                comment:'hello'
            }
        },

        // 可以覆盖jest.setup.js中设置的全局的属性
        //例如 global.plugins = [createTestingPinia()]; //vue组件的全局配置文件
    });
    expect(wrapper.html()).toContain('<span>hello</span>');
});
