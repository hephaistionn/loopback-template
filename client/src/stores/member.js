import Reflux from 'reflux'; 
import {request} from './request';   
//Action
export const actionsMember = Reflux.createActions(['register', 'changeUsername', 'changePassword', 'changeEmail']);
 
//Store
export class StoreMember extends Reflux.Store {

	constructor() {
        super();
        this.state = {
            currentUsername:'',
            currentPassword:'',
            currentEmail: '',
            registered: false
        };
        this.listenables = actionsMember;
    }

    onRegister() {
         request.post('/api/Members/',{
            email:this.state.currentEmail,
            password:this.state.currentPassword,
            username:this.state.currentUsername
         })
        .then(response => {
            this.setState({registered: true});
        })
        .catch(error => {
            console.log(error);
        });
    }

    onChangeUsername(username) {
    	this.setState({currentUsername: username});
    }

    onChangePassword(password) {
		this.setState({currentPassword: password});
    }

    onChangeEmail(email) {
        this.setState({currentEmail: email});
    }

    onRefreshMember() {



    }
    
}