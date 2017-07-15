import Reflux from 'reflux';
import React from 'react';
import {Route, Link} from 'react-router-dom';
import {StoreEvent, actionsEvent} from '../../stores/event';
import {StoreMember, actionsMember} from '../../stores/member';

class Event extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [StoreEvent, StoreMember];
    }

    componentDidMount() {
        actionsEvent.refreshEvent(this.props.match.params.eventId);
    }

    render() {
        const event = this.state.event;
        let memberId = this.state.currentMember.id;
        const urlEdit = '/events/' + event.id + '/editor/';
        return (
            <div className='event mdl-grid'>
                <h1>{event.title}</h1>
                <p>{event.description}</p>
                <img src={event.banner}/>
                {event.ownerId === memberId && <Link to={urlEdit}>Edit</Link>}
            </div>
        );
    }
}

export default Event;  