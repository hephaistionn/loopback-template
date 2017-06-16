import Reflux from 'reflux'; 

//Action
export const actions = Reflux.createActions(['login', 'changeUsername', 'changePassword']);
 
//Store
export class Store extends Reflux.Store {

	constructor() {
        super();
        this.state = {
            currentUsername:'',
            currentPassword:''
        };
        this.listenables = actions;
    }

    onLogin() {

    }

    onChangeUsername(username) {
    	this.setState({currentUsername: username});
    }

    onChangePassword(password) {
		this.setState({currentPassword: password});
    }
}