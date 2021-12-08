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
        'index|+1': 1,
        title: Random.title(3, 5),
        url: Random.url(),
        'tag': ()=>randomTag<string>(3,['vue', 'java', 'movie']),
        comment: Random.paragraph(5,30)

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
