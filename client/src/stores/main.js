import Reflux from 'reflux';
import {actionsAlert} from './alert';
import request from '../tools/request';

//Action
export const actionsMain = Reflux.createActions([
    'progress',
    'redirect'
]);

//Store
export class StoreMain extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            progress: 100,
            redirect: ''
        };
        this.listenables = actionsMain;
    }

    onProgress(value) {
        this.setState({progress: value});
    }

    onRedirect(path) {
        this.setState({'redirect': path});
        this.setState({'redirect': ''});
    }
}