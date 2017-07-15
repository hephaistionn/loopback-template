import Reflux from 'reflux';
import request from '../tools/request';
import {actionsAlert} from './alert';
import {actionsMain} from './main';
import lodash from 'lodash';

//Action
export const actionsEvent = Reflux.createActions([
    'refreshEvent',
    'clearEvent',
    'refreshEvents',
    'updateEvent',
    'saveEvent',
    'setPicture']);
 
//Store
export class StoreEvent extends Reflux.Store {

	constructor() {
        super();
        this.listenables = actionsEvent;
        this.state = {
        	events:[],
            event: {
                title: '',
                description: '',
                banner: '',
                id: ''
            },
            picture: {}
        };
    }

    onRefreshEvents() {
        return request.get('/api/Events')
        .then(response => {
            this.setState({events: response.data});
        });
    }

    onRefreshEvent(eventId) {
        return request.get('/api/Events/'+eventId)
        .then(response => {
            this.setState({event: response.data});
        });
    }

    onClearEvent() {
        this.setState({event: {
            title: '',
            description: '',
            banner: '',
            id: ''
        }});
    }

    onUpdateEvent(value, id) {
        const event = this.state.event;
        event[id] = value;
        this.setState({'event': event});
    }

    onSetPicture(files) {
        const picture = files[0];
        return request.post('/api/containers/upload/', picture)
            .then(response=>{
                const event = this.state.event;
                event.banner = response.data;
                this.setState({'event': event});
            });
    }

    onSaveEvent() {
        const that  = this;
        function createOfReplaceEvent(){
                const event = lodash.cloneDeep(that.state.event);
                const id = event.id;
                delete event.id;
                if(id) {
                    return request.put('/api/Events/'+id, event);
                } else {
                    return request.post('/api/Events', event)
                }
        }

        function reload(response){
            actionsAlert.success('Event saved');
            actionsMain.redirect('/events/'+response.data.id+'/editor/');
        }

        createOfReplaceEvent()
        .then(reload);
    }
}