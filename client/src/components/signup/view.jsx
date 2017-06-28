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

    _onChangePassword1(e) {  
        actionsMember.changePassword1(e.target.value);
        e.preventDefault(); 
    }

    _onChangePassword2(e) {  
        actionsMember.changePassword2(e.target.value);
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
        if(!this.state.registered){
            return (
                <div className='login mdl-grid'>  
                    <form  onSubmit={this._register.bind(this)}>
                        <input type='text' placeholder='email' value={this.state.currentEmail} onChange={this._onChangeEmail.bind(this)}/>
                        <input type='text' placeholder='username' value={this.state.currentUsername} onChange={this._onChangeUsername.bind(this)}/>
                        <input type='password' placeholder='password' value={this.state.currentPassword1} onChange={this._onChangePassword1.bind(this)}/>
                        <input type='password' placeholder='password' value={this.state.currentPassword2} onChange={this._onChangePassword2.bind(this)}/>
                        <input type='submit' value='Register' />
                    </form>
                </div>
            );
        }else{
            return (
                <div className='login mdl-grid'>  
                    <div> Check your email to confirm the registration </div>
                </div>
            );
        }
    }
};

export default Signup;  