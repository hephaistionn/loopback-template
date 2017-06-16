
import {render} from 'react-dom';
import Reflux from 'reflux';
import React from 'react';


//PAGES
import Home from './home/view'; 
import Header from './header/view';
import Login from './login/view';
import Events from './events/view';

//STORE
import {Store, actions} from './model';

class App extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = Store; 
    }

    render() {
        const route = this.state.route;
        return (
            <div className='app'> 
                <Header title='My template'/>
                {route[0] === 'events' && <Events eventId={route[1]}/>}
                {route[0] === 'home' && <Home label='list' highlight={route[1]}/>}
                {route[0] === 'login' && <Login />}
            </div>
        );
    }
};


render(<App />, document.getElementById('app'));    