import Reflux from 'reflux'; 
import {request} from './request';   
//Action
export const actionsMember = Reflux.createActions(['register', 'changeUsername', 'changePassword1', 'changePassword2', 'changeEmail']);
 
//Store
export class StoreMember extends Reflux.Store {

	constructor() {
        super();
        this.state = {
            currentUsername:'',
            currentPassword1:'',
            currentPassword2:'',
            currentEmail: '',
            registered: false
        };
        this.listenables = actionsMember;
    }

    onRegister() {
         request.post('/api/Members/',{
            email:this.state.currentEmail,
            password:this.state.currentPassword1,
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

    onChangePassword1(password) {
		this.setState({currentPassword1: password});
    }

    onChangePassword2(password) {
        this.setState({currentPassword2: password});
    }


    onChangeEmail(email) {
        this.setState({currentEmail: email});
    }

    onRefreshMember() {



    }
    
}