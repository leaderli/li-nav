// test.ts

import {Random, mock} from 'mockjs';
import {MockMethod} from 'vite-plugin-mock';

const bookmarks = mock({
    'data|10': [{
        'index|+1': 1,
        title: Random.title(3, 5),
        url: '超级管理员',
        'tag|1-3': ['vue', 'java', 'movie'],
        comment: Random.url()

    }]
})
export default [

    {
        url: '/bookmarks',
        method: 'get',
        response: () => {
            return bookmarks.data
        }
    }
] as MockMethod[];
