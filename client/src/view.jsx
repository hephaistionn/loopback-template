
import {render} from 'react-dom';
import Reflux from 'reflux';
import React from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom'

//PAGES
import Home from './home/view'; 
import Header from './header/view';
import Login from './login/view';
import Events from './events/view';
import Event from './event/view';
import EventEditor from './eventEditor/view';

//STORE
import {Store, actions} from './model';

class App extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = Store; 
    }

    render() {
        return (
            <BrowserRouter>
                <div className='mdl-layout'> 
                    <Header title='My template'/>
                    <div className='mdl-layout__content'>
                        <div className="mdl-grid">
                            <div className="mdl-layout-spacer"></div> 
                            <div className='mdl-cell mdl-cell--6-col box-shadow'>  
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/events" component={Events}/>
                                <Route path={'/events/:eventId'} component={Event}/>
                                <Route exact path="/login" component={Login}/>
                                <Route path="/editor" component={EventEditor}/>
                            </div>  
                            <div className="mdl-layout-spacer"></div>
                        </div>         
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};


render(<App />, document.getElementById('app'));    