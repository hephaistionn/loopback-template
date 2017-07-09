import Reflux from 'reflux';
import {actionsAlert} from './alert';

//Action
const actionsRequest = Reflux.createActions(['progress']);

//Store
export class RequestStore extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            progress: 100
        };
        this.listenables = actionsRequest;
    }

    onProgress(value) {
        this.setState({progress: value});
    }
}

//tools 
import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token');
if(AUTH_TOKEN) {
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

axios.defaults.onUploadProgress = function(progressEvent) {
    const percent = progressEvent.loaded / progressEvent.total * 100;
    actionsRequest.progress(percent);
};

axios.defaults.onDownloadProgress = function(progressEvent) {
    const percent = progressEvent.loaded / progressEvent.total * 100;
    actionsRequest.progress(percent);
};


export const request = {
    get: function get(url) {
        return axios.get(url);
    },
    put: function put(url, form, config) {
        return axios.put(url, form, config);
    },
    post: function post(url, formData, configData) {
        let form = formData;
        let config  = configData;
        if(formData && formData.constructor.name === 'File') {
            form = new FormData();
            form.append('banner', formData, formData.name);
            config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
        }
        return axios.post(url, form, config);
    },
    storeToken: function storeToken(AUTH_TOKEN) {
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        localStorage.setItem('token', AUTH_TOKEN);
    }
};