
import Reflux from 'reflux';
import React from 'react';
import {StoreAuth, actionsAuth} from '../../stores/auth';

class Login extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = StoreAuth; 
    }  

    _onChangeEmail(e) { 
        actionsAuth.changeEmail(e.target.value);
    }

    _onChangePassword(e) {  
        actionsAuth.changePassword(e.target.value); 
    }

    _login(e) {
        actionsAuth.login();
        e.preventDefault();  
    }

    render() {
        return (
            <div className='login mdl-grid'>  
                <form  onSubmit={this._login.bind(this)}>
                    <input type='text' placeholder='email' value={this.state.currentEmail} onChange={this._onChangeEmail.bind(this)}/>
                    <input type='password' placeholder='password' value={this.state.currentPassword} onChange={this._onChangePassword.bind(this)}/>
                    <input type='submit' value='Login' />
                </form>
            </div>
        );
    }
};

export default Login;  