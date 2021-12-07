import axiosNew, {Method} from "axios";

const axios = function (path: string, method:Method= 'GET', data: object = {}) {

    return new Promise((resolve, reject) => {

        let datas:object = {params:{... data}}
        if('POST' === method){
            datas = {...data}
        }
        axiosNew({
            url:path,
            method,
            ...datas
        }).then(res => {
            resolve(res.data)
        }).catch(err => reject(err))
    })
}
export default axios;
