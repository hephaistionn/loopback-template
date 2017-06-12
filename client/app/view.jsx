
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

import Home from './home/view'; 
import Header from './header/view';

class App extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.actions = actions;
        this.store = Store; 
    }  
    
    render() {
        return (
            <div className='app'> 
                <Header title='My template'/>
                <Home label='My list'/>
            </div>
        );
    }
};

export default App;  