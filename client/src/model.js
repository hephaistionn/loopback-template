import Reflux from 'reflux'; 

//Action
export const actions = Reflux.createActions([]);
 
//Store
export class Store extends Reflux.Store {

	constructor() {
        super();
        this.state = {
        };
        this.listenables = actions;
    }
}