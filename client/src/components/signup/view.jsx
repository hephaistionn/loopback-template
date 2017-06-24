import Reflux from 'reflux';
import React from 'react';
import {StoreMember, actionsMember} from '../../stores/member';

class Signup extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = StoreMember; 
    }  

    _onChangeUsername(e) { 
        actionsMember.changeUsername(e.target.value);
        e.preventDefault(); 
    }

    _onChangePassword(e) {  
        actionsMember.changePassword(e.target.value);
        e.preventDefault(); 
    }

    _onChangeEmail(e) {  
        actionsMember.changeEmail(e.target.value); 
        e.preventDefault(); 
    }

    _register(e) {
        actionsMember.register();
        e.preventDefault(); 
    }

    render() {
        return (
            <div className='login mdl-grid'>  
                <form  onSubmit={this._register.bind(this)}>
                    <input type='text' placeholder='email' value={this.state.currentEmail} onChange={this._onChangeEmail.bind(this)}/>
                    <input type='text' placeholder='username' value={this.state.currentUsername} onChange={this._onChangeUsername.bind(this)}/>
                    <input type='password' placeholder='password' value={this.state.currentPassword} onChange={this._onChangePassword.bind(this)}/>
                    <input type='submit' value='Register' />
                </form>
            </div>
        );
    }
};

export default Signup;  