import Reflux from 'reflux';
import {request} from './request'; 

//Action
export const actionsEvent = Reflux.createActions(['refreshEvent', 'refreshEvents', 'changeForm', 'saveForm']);
 
//Store
export class StoreEvent extends Reflux.Store {

	constructor() {
        super();
        this.listenables = actionsEvent;
        this.state = {
        	events:[],
            event: {
                title: '',
                description: ''
            }
        };
    }

    onRefreshEvents() {
        request.get('/api/Events')
        .then(response => {
            this.setState({
                events: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
 
    }

    onRefreshEvent(eventId) {
        request.get('/api/Events/'+eventId)
        .then(response => {
            this.setState(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    onChangeForm(value, id) {
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    onSaveForm() {
        request.post('/api/Events/replaceOrCreate', this.state)
        .then(response=> { 
            this.setState(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
}