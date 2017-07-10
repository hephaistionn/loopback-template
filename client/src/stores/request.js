import Reflux from 'reflux';
import {actionsAlert} from './alert';

//Action
export const actionsRequest = Reflux.createActions(['progress', 'redirect']);

//Store
export class StoreRequest extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            progress: 100,
            redirect: ''
        };
        this.listenables = actionsRequest;
    }

    onProgress(value) {
        this.setState({progress: value});
    }

    onRedirect(path) {
        this.setState({'redirect': path});
        this.setState({'redirect': ''});
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
    put: function put(url, form, config, redirect ) {
        return axios.put(url, form, config)
        .then(response => {
            if(redirect)
                actionsRequest.redirect(redirect);
            return response;
        });
    },
    post: function post(url, formData, configData, redirect) {
        let form = formData;
        let config  = configData;
        if(formData && formData.constructor.name === 'File') {
            form = new FormData();
            form.append('banner', formData, formData.name);
            config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
        }
        return axios.post(url, form, config)
        .then(response => {
            if(redirect)
                actionsRequest.redirect(redirect);
            return response;
        });
    },
    storeToken: function storeToken(AUTH_TOKEN) {
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        localStorage.setItem('token', AUTH_TOKEN);
    }
};