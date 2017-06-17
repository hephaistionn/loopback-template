
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

class EventEditor extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = Store; 
    }

    _onChangeForm(e) { 
        actions.changeForm(e.target.value, e.target.placeholder);
    }

    _saveForm(e) {
        actions.saveForm();
        e.preventDefault();    
    } 

    render() {
        return (
            <div className='eventEditor'> 
                <form  onSubmit={this._saveForm.bind(this)}>
                    <p>id:{this.state.id }</p>
                    <input type="text" placeholder="title" value={this.state.title} onChange={this._onChangeForm.bind(this)}/>
                    <input type="text" placeholder="description" value={this.state.description} onChange={this._onChangeForm.bind(this)}/>
                    <input type="submit" value="save" />
                </form>
            </div>
        );
    }
};

export default EventEditor;  