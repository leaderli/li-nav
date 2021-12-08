import axiosNew, {Method} from "axios";

const axios = function <Req , Resp>(path: string, method: Method = 'GET', data: Req = {} as Req) {

    return new Promise<Resp>((resolve, reject) => {

        let datas: any= {params: {...data}}
        if ('POST' === method) {
            datas = {...data}
        }
        axiosNew({
            url: path,
            method,
            ...datas
        }).then(res => {
            resolve(res.data)
        }).catch(err => reject(err))
    })
}
export default axios;

