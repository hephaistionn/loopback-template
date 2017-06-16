
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

import Event from './event/view';

class Events extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = Store; 
    }

    componentDidMount() {
		actions.refresh();
    } 

    render() {
        return (
        	<div className='events'>
        	{this.props.eventId && <Event eventID={this.props.eventId}/>}
        	{!this.props.eventId &&  
                <ul>
                {this.state.events.map((name, index) =>
                        <li key={index}>{name}</li>
                )} 
                </ul> 
            }
            </div>
        );
    }
};

export default Events;  