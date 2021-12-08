import axiosNew from "axios";
const axios = function (path, method = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let datas = { params: { ...data } };
        if ('POST' === method) {
            datas = { ...data };
        }
        axiosNew({
            url: path,
            method,
            ...datas
        }).then(res => {
            resolve(res.data);
        }).catch(err => reject(err));
    });
};
export default axios;
//# sourceMappingURL=request.js.map