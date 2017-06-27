import Reflux from 'reflux'; 
import {request} from './request';  

//Action
export const actionsAuth = Reflux.createActions(['login', 'logout', 'changeEmail', 'changePassword', 'getProfile']);
 
//Store
export class StoreAuth extends Reflux.Store {

	constructor() {
        super();
        this.state = {
            currentEmail:'',
            currentPassword:'',
            profile: null
        };
        this.listenables = actionsAuth;
    }

    onLogin() {
         request.post('/api/Members/login',{
            username:this.state.currentEmail,
            password:this.state.currentPassword,
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

    onChangeEmail(email) {
        this.setState({currentEmail: email});
    }

    onChangePassword(password) {
		this.setState({currentPassword: password});
    }

    onGetProfile() {
        const userId = localStorage.getItem('member');
        if(userId){
            return request.get('/api/Members/'+userId)
            .then(response => {
                this.setState({profile: response.data});
            })
            .catch(error => {
                this.setState({profile: null});
            });
        }
    }
}