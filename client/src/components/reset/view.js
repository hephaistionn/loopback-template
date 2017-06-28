import Reflux from 'reflux';
import React from 'react';
import {StoreAuth, actionsAuth} from '../../stores/auth';

class Reset extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = StoreAuth; 
    }  

    _onChangePassword1(e) {  
        actionsAuth.changePassword1(e.target.value); 
    }
    _onChangePassword2(e) {  
        actionsAuth.changePassword2(e.target.value); 
    }

    _onResetPasswordConfirm(e) {
        actionsAuth.resetConfirm();
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