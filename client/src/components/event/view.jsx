
import Reflux from 'reflux';
import React from 'react';
import {StoreEvent, actionsEvent} from '../../stores/event';

class Event extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = StoreEvent; 
    }  

    componentDidMount() {
        actionsEvent.refreshEvent(this.props.match.params.eventId);
    }

    render() {
        return (
            <div className='event mdl-grid'> 
               <h1>{this.state.title}</h1>
               <p>{this.state.description}</p>
            </div>
        );
    }
};

export default Event;  