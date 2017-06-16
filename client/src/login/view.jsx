
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

class Login extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = Store; 
    }  

    _onChangeUsername(e) { 
        actions.changeUsername(e.target.value);
    }

    _onChangePassword(e) {  
        actions.changePassword(e.target.value); 
    }

    _login(e) {
        actions.login();
    }

    render() {
        return (
            <div className='login'> 
                <form  onSubmit={this._login.bind(this)}>
                    <input type="text" placeholder="username" value={this.state.currentUsername} onChange={this._onChangeUsername.bind(this)}/>
                    <input type="password" placeholder="password" value={this.state.currentPassword} onChange={this._onChangePassword.bind(this)}/>
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
};

export default Login;  