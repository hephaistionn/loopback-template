import Reflux from 'reflux';
import request from '../tools/request';
import parser from '../tools/parser';
import {actionsAlert} from './alert';
import {actionsMain} from './main';

//Action
export const actionsMember = Reflux.createActions([
    'register',
    'login',
    'logout',
    'updateMember',
    'resetPassword',
    'resetConfirm',
    'loadCurrentMember',
    'loadMember',
    'removeCurrentMember'
]);
//Store
export class StoreMember extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            member: {},
            currentMember: {},
            registered: false
        };
        this.checkQueryAuth();
        this.listenables = actionsMember;
    }

    onRegister() {
        return request.post('/api/Members/', {
            email: this.state.member.email,
            password: this.state.member.password1,
            username: this.state.member.username
        })
        .then(response => {
            this.setState({registered: true, member: {}});
        });
    }

    onLogin(redirectPath) {
        request.post('/api/Members/login', {
            email: this.state.member.email,
            password:  this.state.member.password1
        })
        .then(response => {
            request.storeToken(response.data.id);
            localStorage.setItem('member', response.data.userId);
            return this.onLoadCurrentMember();
        })
        .then(()=>{
            actionsMain.redirect(redirectPath);
        })
    }

    onLogout(redirectPath) {
        debugger;
        request.post('/api/Members/logout')
        .then(response => {
            request.storeToken('');
            localStorage.setItem('currentMember', '');
            this.onRemoveCurrentMember();
        })
        .then(()=>{
            actionsMain.redirect(redirectPath);
        })
    }

    onUpdateMember(value, id) {
        const member = this.state.member;
        member[id] = value;
        this.setState({member: member});
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
        request.post('/api/Members/reset-password', form)
        .then(response => {
            actionsAlert.success('Password updated');
            actionsMain.redirect(redirectPath);
        });
    }

    checkQueryAuth() {
        const query = parser.getQuery();
        if(query.token && query.id) {
            request.storeToken(query.token);
            localStorage.setItem('member', query.id);
        }
    }

    onLoadMember(memberId) {
        request.get('/api/Members/' + userId)
            .then(response => {
                this.setState({member: response.data});
            });
    }

    onLoadCurrentMember() {
        const userId = localStorage.getItem('member');
        if(userId) {
            request.get('/api/Members/' + userId)
                .then(response => {
                    this.setState({'currentMember': response.data});
                });
        }
    }

    onRemoveCurrentMember() {
        this.setState({'currentMember': {}});
    }

}