import { createPinia } from 'pinia';
import { defineStore } from 'pinia';

// 泛型接口
import { BookMark} from '@/type/bookMark';


export const pinia = createPinia();

export const defineBookMarks= defineStore({
    id: 'bookmarks',
    state: (): Array<BookMark> => ([]),
    getters: {},
    actions: {}
});

