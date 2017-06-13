import Reflux from 'reflux'; 

//Action
export const actions = Reflux.createActions(['addName', 'removeName']);
 
//Store
export class Store extends Reflux.Store {

	constructor() {
        super();
        this.state = {
        	names:['Thomas']
        };
        this.listenables = actions;
    }

    onAddName(name) {
    	const names = this.state.names;
    	names.push(name);
    	this.setState({names: names});
    }

    onRemoveName() {
    	const names = this.state.names;
    	names.pop();
    	this.setState({names: names});
    }
}