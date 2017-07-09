import Reflux from 'reflux';
import {request} from './request';
import tools from './tools';
import {actionsAlert} from './alert';

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
            currentProfile: null
        };
        this.checkQueryAuth();
        this.listenables = actionsMember;
    }

    onRegister() {
        request.post('/api/Members/', {
            email: this.state.currentEmail,
            password: this.state.currentPassword1,
            username: this.state.currentUsername
        })
            .then(response => {
                this.setState({registered: true});
            })
            .catch(error => {
                console.log(error);
            });
    }

    onLogin() {
        request.post('/api/Members/login', {
            email: this.state.currentEmail,
            password: this.state.currentPassword1
        })
            .then(response => {
                request.storeToken(response.data.id);
                localStorage.setItem('member', response.data.userId);
                return this.onGetProfile();
            })
            .then(() => {
                location.pathname = '/';
            })
            .catch(error => {
                console.log(error);
            });
    }

    onLogout() {
        request.post('/api/Members/logout')
            .then(response => {
                request.storeToken('');
                localStorage.setItem('member', '');
            }).then(() => {
                location.pathname = '/login/';
            })
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
            return request.get('/api/Members/' + userId)
                .then(response => {
                    this.setState({currentProfile: response.data});
                })
                .catch(error => {
                    this.setState({currentProfile: null});
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
            })
    }

    onResetConfirm() {
        if(this.state.currentPassword1 !== this.state.currentPassword2) {
            actionsAlert.success('Password not identical');
            return;
        }

        const form = {
            newPassword: this.state.currentPassword1
        };
        request.post('/api/Members/reset-password', form)
            .then(response => {
                actionsAlert.success('Password updated');
                location.pathname = '/';
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