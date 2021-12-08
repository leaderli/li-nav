// test.ts

import {Random, mock} from 'mockjs';
import {MockMethod} from 'vite-plugin-mock';

const randomTag = function<T> (num:number,arr:Array<T>){

    let result:Array<T> = []
    for (let i = 0; i < num; i++) {
        result.push(Random.pick(arr))
    }
    return [... new Set(result)]

}
const bookmarks_mock = mock({
    'data|10': [{
        'index|+1': 0,
        title: '@cname',
        url: Random.url(),
        'tags': ()=>randomTag<string>(3,['vue', 'java', 'movie']),
        comment: '@county(true)'

    }]
})
export default [

    {
        url: '/bookmarks',
        method: 'get',
        response: () => {
            return bookmarks_mock.data
        }
    }
] as MockMethod[];
