import axios from '@/util/request'
import {bookmark_type} from "@/type/bookmark_type";


export const bookmarks_api = async function () {

    return await axios<void, Array<bookmark_type>>("/api/bookmarks")
}


export const update_bookmarks_api = async function (bookmarks: Array<bookmark_type>) {

    return await axios('/api/bookmarks', 'PUT', {
        dataType:'json',
        data: bookmarks
    })
}

