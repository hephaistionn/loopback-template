import Reflux from 'reflux';
import React from 'react';
import Dropzone from 'react-dropzone'
import {StoreEvent, actionsEvent} from '../../stores/event';

class EventEditor extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreEvent;
    }

    componentDidMount() {
        if(this.props.match.params.eventId) {
            actionsEvent.refreshEvent(this.props.match.params.eventId);
        } else {
            actionsEvent.clearEvent();
        }
    }

    updateEvent(e) {
        actionsEvent.updateEvent(e.target.value, e.target.name);
    }

    saveEvent(e) {
        actionsEvent.saveEvent();
        e.preventDefault();
    }

    onDrop(files) {
        actionsEvent.setPicture(files);
    }

    render() {
        return (
            <div className='eventEditor mdl-grid'>
                <form onSubmit={this.saveEvent}>
                    <input type='text' name='title' placeholder='title'
                           value={this.state.event.title} onChange={this.updateEvent}/>
                    <input type='text' name='description' placeholder='description'
                           value={this.state.event.description} onChange={this.updateEvent}/>
                    <Dropzone onDrop={this.onDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                        <img src={this.state.picture.preview ? this.state.picture.preview : this.state.event.banner}/>
                    </Dropzone>
                    <input type='submit' value='save'/>
                </form>
            </div>
        );
    }
}

export default EventEditor;  