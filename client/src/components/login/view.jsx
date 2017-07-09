
import Reflux from 'reflux';
import React from 'react';
import {Link} from 'react-router-dom'
import {StoreMember, actionsMember} from '../../stores/member';

class Login extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = StoreMember;
    }  

    changeEmail(e) {
        actionsMember.changeEmail(e.target.value);
    }

    changePassword(e) {
        actionsMember.changePassword1(e.target.value);
    }

    login(e) {
        actionsMember.login();
        e.preventDefault();  
    }

    resetPassword(e) {
        actionsMember.resetPassword();
        e.preventDefault(); 
    }

    render() {
        return (
            <div className='login mdl-grid'>  
                <form  onSubmit={this.login}>
                    <input type='text' placeholder='email' value={this.state.currentEmail} onChange={this.changeEmail}/>
                    <input type='password' placeholder='password' value={this.state.currentPassword1} onChange={this.changePassword}/>
                    <input type='submit' value='Login' />
                    <a className='mdl-navigation__link'  onClick={this.resetPassword}>Reset Password</a>
                </form>
            </div>
        );
    }
};

export default Login;  