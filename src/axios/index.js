import Vue from 'vue';
import axios from 'axios';

axios.defaults.timeout = 15000;

const axiosMiddlewares = () => {
    let xhrCounts = 0;
    axios.interceptors.request.use((config) => {
        // !xhrCounts && Vue.$loading.service();
        xhrCounts++;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
        xhrCounts--;
        // if (xhrCounts <= 0) {
        //     Vue.$loading.service();
        // }
        return response;
    }, (error) => {
        xhrCounts--;
        // if (xhrCounts <= 0) {
        //     Vue.$loading.service();
        // }
        return Promise.reject(error);
    });
}
axiosMiddlewares();

const baseURL = 'http://106.13.198.47:8088';
// const baseURL = 'http://117.166.64.24:8088';

const axiosHandle = (url, params, option) => {
    return new Promise((resolve, reject) => {
        axios({url, baseURL, params, ...option}).then((res) => {
            resolve(res);
        }).catch(error => {
            reject(error);
        }) 
    })
};

export const $get = (url, params, option = {}) => {
    option.method = 'get';
    return axiosHandle(url, params, option);
};
export const $post = (url, params, option = {}) => {
    option.method = 'post';
    return axiosHandle(url, params, option);
}