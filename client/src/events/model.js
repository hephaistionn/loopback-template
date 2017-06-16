import Reflux from 'reflux'; 

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
    	this.setState({
			events: ['event1','event2']
    	})
    }
}