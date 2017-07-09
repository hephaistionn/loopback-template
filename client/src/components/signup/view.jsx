import Reflux from 'reflux';
import React from 'react';
import {StoreMember, actionsMember} from '../../stores/member';

class Signup extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = StoreMember; 
    }  

    changeUsername(e) {
        actionsMember.changeUsername(e.target.value);
        e.preventDefault(); 
    }

    changePassword1(e) {
        actionsMember.changePassword1(e.target.value);
        e.preventDefault(); 
    }

    changePassword2(e) {
        actionsMember.changePassword2(e.target.value);
        e.preventDefault(); 
    }

    changeEmail(e) {
        actionsMember.changeEmail(e.target.value); 
        e.preventDefault(); 
    }

    register(e) {
        actionsMember.register();
        e.preventDefault(); 
    }

    render() {
        if(!this.state.registered){
            return (
                <div className='login mdl-grid'>  
                    <form  onSubmit={this.register}>
                        <input type='text' placeholder='email' value={this.state.currentEmail} onChange={this.changeEmail}/>
                        <input type='text' placeholder='username' value={this.state.currentUsername} onChange={this.changeUsername}/>
                        <input type='password' placeholder='password' value={this.state.currentPassword1} onChange={this.changePassword1}/>
                        <input type='password' placeholder='password' value={this.state.currentPassword2} onChange={this.changePassword2}/>
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