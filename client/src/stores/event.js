import Reflux from 'reflux';
import {request} from './request'; 

//Action
export const actionsEvent = Reflux.createActions(['refreshEvent', 'refreshEvents', 'changeForm', 'saveForm',  'setPicture']);
 
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
                picture: {}
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

    onSetPicture(files) {
        const picture = files[0];
        const event = this.state.event;
        event.picture = picture;  
        this.setState({'event': event});
        //let data = new FormData();
        ///data.append('images', file, file.name);
        //const config = {
        //    headers: { 'content-type': 'multipart/form-data' }
        //}
        //return axios.post('/api/images', data, config)   

        request.post('/api/Containers')
        .then(response=> { 
            console.log('container created');
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
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