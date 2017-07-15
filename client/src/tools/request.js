import axios from 'axios';
import {actionsAlert} from '../stores/alert';
import {actionsMain} from '../stores/main';

const AUTH_TOKEN = localStorage.getItem('token');
if(AUTH_TOKEN) {
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

axios.defaults.onUploadProgress = function(progressEvent) {
    const percent = progressEvent.loaded / progressEvent.total * 100;
    actionsMain.progress(percent);
};

axios.defaults.onDownloadProgress = function(progressEvent) {
    const percent = progressEvent.loaded / progressEvent.total * 100;
    actionsMain.progress(percent);
};


export default {
    get: function get(url) {
        return axios.get(url);
    },
    put: function put(url, form, config) {
        return axios.put(url, form, config)
    },
    post: function post(url, formData, configData) {
        let form = formData;
        let config  = configData;
        if(formData && formData.constructor.name === 'File') {
            form = new FormData();
            const name = Math.floor((1 + Math.random()) * 0x100000000000000).toString(16).substring(1);
            const extension = formData.name.split('.').pop();
            form.append('file', formData, name + '.' + extension);
            config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
        }
        return axios.post(url, form, config)
    },
    storeToken: function storeToken(AUTH_TOKEN) {
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        localStorage.setItem('token', AUTH_TOKEN);
    }
};
