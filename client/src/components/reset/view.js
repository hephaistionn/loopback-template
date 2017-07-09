import Reflux from 'reflux';
import React from 'react';
import {StoreMember, actionsMember} from '../../stores/member';

class Reset extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = StoreMember;
    }  

    _onChangePassword1(e) {
        actionsMember.changePassword1(e.target.value);
    }
    _onChangePassword2(e) {
        actionsMember.changePassword2(e.target.value);
    }

    _onResetPasswordConfirm(e) {
        actionsMember.resetConfirm();
        e.preventDefault();  
    }

    render() {
        return (
            <div className='reset mdl-grid'>  
                <form  onSubmit={this._onResetPasswordConfirm.bind(this)}>
                    <input type='password' placeholder='password' value={this.state.currentPassword1} onChange={this._onChangePassword1.bind(this)}/>
                    <input type='password' placeholder='password' value={this.state.currentPassword2} onChange={this._onChangePassword2.bind(this)}/>
                    <input type='submit' value='Confim' />
                </form>
            </div>
        );
    }
};

export default Reset;  