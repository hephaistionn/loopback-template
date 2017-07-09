
import Reflux from 'reflux';
import React from 'react';
import {Link} from 'react-router-dom'
import {StoreMember, actionsMember} from '../../stores/member';

class Login extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = StoreMember;
    }  

    _onChangeEmail(e) {
        actionsMember.changeEmail(e.target.value);
    }

    _onChangePassword(e) {
        actionsMember.changePassword1(e.target.value);
    }

    _login(e) {
        actionsMember.login();
        e.preventDefault();  
    }

    _onResetPassword(e) {
        actionsMember.resetPassword();
        e.preventDefault(); 
    }

    render() {
        return (
            <div className='login mdl-grid'>  
                <form  onSubmit={this._login.bind(this)}>
                    <input type='text' placeholder='email' value={this.state.currentEmail} onChange={this._onChangeEmail.bind(this)}/>
                    <input type='password' placeholder='password' value={this.state.currentPassword1} onChange={this._onChangePassword.bind(this)}/>
                    <input type='submit' value='Login' />
                    <a className='mdl-navigation__link'  onClick={this._onResetPassword.bind(this)}>Reset Password</a>
                </form>
            </div>
        );
    }
};

export default Login;  