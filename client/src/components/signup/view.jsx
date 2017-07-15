import Reflux from 'reflux';
import React from 'react';
import {StoreMember, actionsMember} from '../../stores/member';

class Signup extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMember;
    }

    updateForm(e) {
        actionsMember.updateMember(e.target.value, e.target.name);
        e.preventDefault();
    }

    register(e) {
        actionsMember.register();
        e.preventDefault();
    }

    render() {
        if(!this.state.registered) {
            return (
                <div className='login mdl-grid'>
                    <form onSubmit={this.register}>
                        <input name='email' type='text' placeholder='email' value={this.state.currentEmail}
                               onChange={this.updateForm}/>
                        <input name='username' type='text' placeholder='username' value={this.state.currentUsername}
                               onChange={this.updateForm}/>
                        <input name='password1' type='password' placeholder='password'
                               value={this.state.currentPassword1} onChange={this.updateForm}/>
                        <input name='password2' type='password' placeholder='password'
                               value={this.state.currentPassword2} onChange={this.updateForm}/>
                        <input type='submit' value='Register'/>
                    </form>
                </div>
            );
        } else {
            return (
                <div className='login mdl-grid'>
                    <div> Check your email to confirm the registration</div>
                </div>
            );
        }
    }
}

export default Signup;  