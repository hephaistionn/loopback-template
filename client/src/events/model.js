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
        	events:[]
        };
    }

    onRefresh() {
        axios.get('/api/Events')
        .then(response => {
            this.setState({
                events: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
 
    }
}