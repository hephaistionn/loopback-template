import Reflux from 'reflux';
import React from 'react';
import {StoreMember, actionsMember} from '../../stores/member';

class Reset extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = StoreMember;
    }  

    changePassword1(e) {
        actionsMember.changePassword1(e.target.value);
    }
    changePassword2(e) {
        actionsMember.changePassword2(e.target.value);
    }

    resetPasswordConfirm(e) {
        actionsMember.resetConfirm('/');
        e.preventDefault();  
    }

    render() {
        return (
            <div className='reset mdl-grid'>  
                <form  onSubmit={this.resetPasswordConfirm}>
                    <input type='password' placeholder='password' value={this.state.currentPassword1} onChange={this.changePassword1}/>
                    <input type='password' placeholder='password' value={this.state.currentPassword2} onChange={this.changePassword2}/>
                    <input type='submit' value='Confim' />
                </form>
            </div>
        );
    }
};

export default Reset;  