
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
                    <input type='text' placeholder='title' value={this.state.title} onChange={this._onChangeForm.bind(this)}/>
                    <input type='text' placeholder='description' value={this.state.description} onChange={this._onChangeForm.bind(this)}/>
                    <Dropzone onDrop={this._onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                     <h2>Dropped files</h2>
                     {this.state.event.picture.name} - {this.state.event.picture.size} bytes <img src={this.state.event.picture.preview} />
                    <input type='submit' value='save' />
                </form>
            </div>
        );
    }
};

export default EventEditor;  