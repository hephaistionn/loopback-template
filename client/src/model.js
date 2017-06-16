import Reflux from 'reflux'; 
import RefluxRouter from 'reflux-router';
//import {Reflux, React, RefluxRouter} from './lib';


//Action
export const actions = Reflux.createActions(['getCurrentRoute']);

//ROUTING
RefluxRouter.initializeRouting('', '/#/'); 
RefluxRouter.onUnknownRoute = actions.getCurrentRoute;
 
//Store
export class Store extends Reflux.Store {

	constructor() {
        super();
        this.state = {
        	route: ''
        };
        this.onGetCurrentRoute();
        this.listenables = actions;
    }

    onGetCurrentRoute() {
    	const currentRoute = RefluxRouter.getRoute();
    	const route = currentRoute.split('/').filter(e => String(e).trim());
        this.setState({
        	route: route
        });

    }
}