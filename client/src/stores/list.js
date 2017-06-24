import Reflux from 'reflux'; 
import {request} from './request'; 

//Action
export const actionsList = Reflux.createActions(['addName', 'removeName', 'changeName']);
 
//Store
export class StoreList extends Reflux.Store {

	constructor() {
        super();
        this.state = {
        	names: ['Thomas'],
            currentName: ''
        };
        this.listenables = actionsList;
    }

    onAddName(name) {
    	const names = this.state.names;
    	names.push(name);
    	this.setState({
            names: names,
            currentName:''
        });
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