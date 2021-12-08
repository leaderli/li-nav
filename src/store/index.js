import { createPinia } from 'pinia';
import { defineStore } from 'pinia';
export const pinia = createPinia();
export const defineBookMarks = defineStore({
    id: 'bookmarks',
    state: () => ([]),
    getters: {},
    actions: {}
});
//# sourceMappingURL=index.js.map