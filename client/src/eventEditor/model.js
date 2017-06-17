import Reflux from 'reflux';
import axios from 'axios'; 

//Action
export const actions = Reflux.createActions(['changeForm', 'saveForm']);
 
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

    onChangeForm(value, id) {
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    onSaveForm() {
        axios.post('/api/Events/replaceOrCreate', this.state)
        .then(response=> { 
            this.setState(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
}