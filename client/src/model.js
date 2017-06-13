import Reflux from 'reflux'; 

//Action
export const actions = Reflux.createActions(['addName']);
 
//Store
export class Store extends Reflux.Store {

	constructor() {
        super();
        this.state = {names:['test']};
        this.listenables = actions;
    }

    onAddName(name) {
        this.state.names.push(name); 
    }
}