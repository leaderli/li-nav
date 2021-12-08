import { createPinia } from 'pinia';
import { defineStore } from 'pinia';

// 泛型接口
import { bookmark_type} from '@/type/bookmark_type';


export const pinia = createPinia();

export const defineBookMarks= defineStore({
    id: 'bookmarks',
    state: (): Array<bookmark_type> => ([]),
    getters: {},
    actions: {}
});

