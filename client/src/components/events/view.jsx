import Reflux from 'reflux';
import React from 'react';
import {Route, Link} from 'react-router-dom'
import {StoreEvent, actionsEvent} from '../../stores/event';

class Events extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreEvent;
    }

    componentDidMount() {
        actionsEvent.refreshEvents();
    }

    render() {
        return (
            <div className='events'>
                <div className="mdl-grid">
                    <Link className="mdl-button mdl-js-button mdl-button--raised" to={'/editor/'}>Create an Event</Link>
                </div>
                <div className="mdl-grid">
                    <div className='mdl-cell mdl-cell--12-col'>
                        {this.state.events.map((event, index) =>
                                <Link className='mdl-card mdl-shadow--4dp' to={'/events/'+event.id} key={index}
                                      style={{backgroundImage:'url(' + event.banner + ')'}}>
                                    <div className='mdl-card__title'>{event.title}</div>
                                </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Events;  