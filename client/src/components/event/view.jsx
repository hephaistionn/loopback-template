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
            <div className='event'>
                <div className="mdl-grid">
                    <div className='mdl-cell mdl-cell--8-col'>
                        <div className="mdl-grid">
                            <h1>{event.title}</h1>
                        </div>
                        <div className="mdl-grid">
                            <p>{event.description}</p>
                        </div>
                    </div>
                    <img className='mdl-cell mdl-cell--4-col' src={event.banner}/>
                </div>
                <div className="mdl-grid">
                    {event.ownerId === memberId &&
                    <Link className="mdl-button mdl-js-button mdl-button--raised" to={urlEdit}>Edit</Link>}
                </div>
            </div>
        );
    }
}

export default Event;  