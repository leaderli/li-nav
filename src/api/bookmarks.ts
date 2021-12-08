import  axios from '@/util/request'



export  const  bookmarks = async function (){

    return await axios("/bookmarks")
}


