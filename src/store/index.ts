import { createPinia } from 'pinia';
import { defineStore } from 'pinia';

// 泛型接口
import { Bookmark} from '@/type/Bookmark';


export const pinia = createPinia();

export const defineBookMarks= defineStore({
    id: 'bookmarks',
    state: (): Array<Bookmark> => ([]),
    getters: {},
    actions: {}
});

