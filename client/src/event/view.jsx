
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

class Event extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = Store; 
    }  

    componentDidMount() {
        actions.refresh(this.props.match.params.eventId);
    }

    render() {
        return (
            <div className='event'> 
               <h1>{this.state.title}</h1>
               <p>{this.state.description}</p>
            </div>
        );
    }
};

export default Event;  