import Reflux from 'reflux';
import {request, actionsRequest} from './request';
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
        this.setState({'picture': picture});  
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

        function refreshEvent(response) {
            that.setState({event: response.data});
            return response;
        }

        function uploadPictureEvent(reponse){
            if(that.state.picture.name) {
                return request.post('/api/Events/'+reponse.data.id+'/uploadBanner', that.state.picture)
                .then(()=>{return reponse.data.id});
            }
        }

        function reload(){
            actionsRequest.redirect('/events/'+that.state.event.id+'/editor/');
        }

        createOfReplaceEvent()
        .then(refreshEvent)
        .then(uploadPictureEvent)
        .then(reload);
    }
}