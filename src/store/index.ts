import _ from 'lodash'

import {createPinia, defineStore} from 'pinia';
import  pinyin from  'pinyin'
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
                    let append_predicate;
                    slot = slot.toLowerCase();
                    if (slot.startsWith('#') && slot.length > 1) {

                        slot = slot.substring(1)
                        append_predicate = (): boolean => {
                            return !!_.find(Object.values(bookmark.tags), tag => tag.toLowerCase().includes(slot))
                        }
                    } else {
                        append_predicate = (item: bookmark_type): boolean =>{

                        return      item.comment.toLowerCase().includes(slot)
                            ||pinyin(item.comment,{
                                style: pinyin.STYLE_NORMAL
                            }).join('').includes(slot)
                        }
                    }

                    bookmark_predicates.push(append_predicate)
                }


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
            //根据点击次数排序
            this.bookmarks = bookmarks.sort((a,b)=>(b.count|0)-(a.count|0))
        },

        set_search(search: string) {
            this.search = search?.trim() || '';
        }
    }
});

