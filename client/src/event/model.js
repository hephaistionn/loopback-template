import Reflux from 'reflux'; 
import axios from 'axios'; 

//Action
export const actions = Reflux.createActions(['refresh']);
 
//Store
export class Store extends Reflux.Store {

	constructor() {
        super();
        this.listenables = actions;
        this.state = {
        	title: '',
        	description: ''
        };
    }

    onRefresh(eventId) {
        axios.get('/api/Events/'+eventId)
        .then(response => {
            this.setState(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
}