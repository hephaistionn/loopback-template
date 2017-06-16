import Reflux from 'reflux'; 

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

    onRefresh() {
    	this.setState({
        	title: 'Event : '+ Math.floor(Math.random()*100),
        	description: 'dsfdsfsdf sdfsdfdsf sdfdsfs sdfsdfsd sdfds'
        });
    }
}