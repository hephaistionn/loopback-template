import Reflux from 'reflux'; 

//Action
export const actions = Reflux.createActions(['addName', 'removeName', 'changeName']);
 
//Store
export class Store extends Reflux.Store {

	constructor() {
        super();
        this.state = {
        	names: ['Thomas'],
            currentName: ''
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

    onChangeName(value) {
        this.setState({currentName: value}); 
    }
}