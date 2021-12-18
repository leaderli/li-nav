import _ from 'lodash'

import {createPinia, defineStore} from 'pinia';

// 泛型接口
import {bookmark_type} from '@/type/bookmark_type';

export interface bookmarks_store_type {
    col: number,
    search: string
    bookmarks: Array<bookmark_type>
}
export const pinia = createPinia();


type  bookmark_predicate = {
    (item:bookmark_type):boolean
}
export const define_bookmarks_store = defineStore({
    id: 'bookmarks',
    state: (): bookmarks_store_type => ({
        col: 4,
        search: '',
        bookmarks: []
    }),
    getters: {

        filter_bookmarks(state): Array<bookmark_type> {


            if (!state.search) {
                return state.bookmarks
            }

            return state.bookmarks.filter(bookmark => {

                const search = state.search;
                let bookmark_predicates:Array<bookmark_predicate> = [(): boolean => !search?.trim() || search === '#']


                for (let slot of (search || '').split(/\s/)) {
                    console.log('slot',slot)
                    let append_predicate;
                    if (slot.startsWith('#') && slot.length > 1) {

                        slot = slot.substring(1)
                        append_predicate = (): boolean => {
                            console.log(Object.values(bookmark.tags),'------>',slot)
                            return !!_.find(Object.values(bookmark.tags), tag => tag.includes(slot))
                        }
                    } else {
                        append_predicate = (item: bookmark_type): boolean =>
                            item.title.includes(slot) || item.comment.includes(slot)
                    }

                    bookmark_predicates.push(append_predicate)
                }


                console.log(bookmark_predicates)
                return _.find(bookmark_predicates,bookmark_predicate=>bookmark_predicate(bookmark))
            })

        },
        shard_bookmarks(state): Array<Array<bookmark_type>> {

            let result: Array<Array<bookmark_type>> = []
            let items: Array<bookmark_type> = []
            for (let bookmark of this.filter_bookmarks) {

                if (items.length < state.col) {
                    items.push(bookmark)
                } else {
                    result.push(items)
                    items = [bookmark]
                }
            }
            if (items.length > 0) {
                result.push(items)
            }
            return result;
        }
    },
    actions: {

        set_bookmarks(bookmarks: Array<bookmark_type>) {
            this.bookmarks = bookmarks
            console.log(this.bookmarks)
        },

        set_search(search: string) {
            console.log('set search ', search)
            this.search = search?.trim() || '';
        }
    }
});

