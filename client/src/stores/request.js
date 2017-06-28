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
if(AUTH_TOKEN){
	axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

axios.storeToken = function storeToken(AUTH_TOKEN) {
	axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	localStorage.setItem('token', AUTH_TOKEN);
}

axios.defaults.onUploadProgress = function (progressEvent) {
	const percent = progressEvent.loaded/progressEvent.total*100;
	actionsRequest.progress(percent);
}

axios.defaults.onDownloadProgress = function (progressEvent) {
    const percent = progressEvent.loaded/progressEvent.total*100;
    actionsRequest.progress(percent);
}

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    actionsAlert.error(error.response.data.error.message);
    return Promise.reject(error);
  });

exports.request =  axios;