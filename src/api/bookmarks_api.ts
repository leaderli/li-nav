import  axios from '@/util/request'
import {bookmark_type} from "@/type/bookmark_type";



export  const  bookmarks_api = async function (){

    return await axios<void,Array<bookmark_type>>("/bookmarks")
}


