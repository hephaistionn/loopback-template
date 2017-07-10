import Reflux from 'reflux';
import {request} from './request';
import tools from './tools';
import {actionsAlert} from './alert';
import {BrowserRouter} from 'react-router-dom'

//Action
export const actionsMember = Reflux.createActions([
    'register',
    'login',
    'logout',
    'getProfile',
    'changeUsername',
    'changePassword1',
    'changePassword2',
    'changeEmail',
    'resetPassword',
    'resetConfirm']);
//Store
export class StoreMember extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            currentUsername:'',
            currentEmail: '',
            currentPassword1:'',
            currentPassword2:'',
            registered: false,
            currentProfile: null,
            redirect: ''

        };
        this.checkQueryAuth();
        this.listenables = actionsMember;
    }

    onRegister() {
        return request.post('/api/Members/', {
            email: this.state.currentEmail,
            password: this.state.currentPassword1,
            username: this.state.currentUsername
        })
        .then(response => {
            this.setState({registered: true});
        });
    }

    onLogin(redirectPath) {
        request.post('/api/Members/login', {
            email: this.state.currentEmail,
            password: this.state.currentPassword1
        },null, redirectPath)
        .then(response => {
            request.storeToken(response.data.id);
            localStorage.setItem('member', response.data.userId);
            return this.onGetProfile();
        });
    }

    onLogout(redirectPath) {
        request.post('/api/Members/logout', null, null, redirectPath)
        .then(response => {
            request.storeToken('');
            localStorage.setItem('member', '');
            this.setState({currentProfile: null});
        });
    }

    onChangeUsername(username) {
        this.setState({currentUsername: username});
    }

    onChangePassword1(password) {
        this.setState({currentPassword1: password});
    }

    onChangePassword2(password) {
        this.setState({currentPassword2: password});
    }

    onChangeEmail(email) {
        this.setState({currentEmail: email});
    }

    onGetProfile() {
        const userId = localStorage.getItem('member');
        if(userId) {
            request.get('/api/Members/' + userId)
            .then(response => {
                this.setState({currentProfile: response.data});
            });
        }
    }

    onResetPassword() {
        const form = {
            email: this.state.currentEmail
        };
        request.post('/api/Members/reset', form)
        .then(response => {
            actionsAlert.success('Check your email for further instructions');
        });
    }

    onResetConfirm(redirectPath) {
        if(this.state.currentPassword1 !== this.state.currentPassword2) {
            actionsAlert.success('Password not identical');
            return;
        }

        const form = {
            newPassword: this.state.currentPassword1
        };
        request.post('/api/Members/reset-password', form, null, redirectPath)
        .then(response => {
            actionsAlert.success('Password updated');
        });
    }

    checkQueryAuth() {
        const query = tools.getQuery();
        if(query.token && query.id) {
            request.storeToken(query.token);
            localStorage.setItem('member', query.id);
        }
    }

}