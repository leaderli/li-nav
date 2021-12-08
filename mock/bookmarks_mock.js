// test.ts
import { Random, mock } from 'mockjs';
const randomTag = function (num, arr) {
    let result = [];
    for (let i = 0; i < num; i++) {
        result.push(Random.pick(arr));
    }
    return [...new Set(result)];
};
const bookmarks_mock = mock({
    'data|10': [{
            'index|+1': 1,
            title: Random.title(3, 5),
            url: Random.url(),
            'tag': () => randomTag(3, ['vue', 'java', 'movie']),
            comment: Random.paragraph(5, 30)
        }]
});
export default [
    {
        url: '/bookmarks',
        method: 'get',
        response: () => {
            return bookmarks_mock.data;
        }
    }
];
//# sourceMappingURL=bookmarks_mock.js.map