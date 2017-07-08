
import Reflux from 'reflux';
import React from 'react';
import Dropzone from 'react-dropzone'
import {StoreEvent, actionsEvent} from '../../stores/event';

class EventEditor extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = StoreEvent; 
    }

    _onChangeForm(e) { 
        actionsEvent.changeForm(e.target.value, e.target.placeholder);
    }

    _saveForm(e) {
        actionsEvent.saveForm();
        e.preventDefault();    
    }

    _onDrop(files) {
        actionsEvent.setPicture(files);
    }

    render() {
        return (
            <div className='eventEditor mdl-grid'> 
                <form  onSubmit={this._saveForm.bind(this)}>
                    <p>id:{this.state.id }</p>
                    <input type='text' placeholder='title' value={this.state.event.title} onChange={this._onChangeForm.bind(this)}/>
                    <input type='text' placeholder='description' value={this.state.event.description} onChange={this._onChangeForm.bind(this)}/>
                    <img src={this.state.event.banner}/>
                    <Dropzone onDrop={this._onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                        <img src={this.state.picture.preview} />
                    </Dropzone>
                    <input type='submit' value='save' />
                </form>
            </div>
        );
    }
};

export default EventEditor;  