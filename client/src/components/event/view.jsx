
import Reflux from 'reflux';
import React from 'react';
import {Route, Link} from 'react-router-dom';
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
               <h1>{this.state.event.title}</h1>
               <p>{this.state.event.description}</p>
                <Link to={'/events/'+this.state.event.id+'/editor/'}>Edit</Link>
            </div>
        );
    }
};

export default Event;  