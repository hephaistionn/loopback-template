
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
                <div className='app'> 
                      <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Event</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/editor">Editor</Link></li>
                      </ul>
                    <Header title='My template'/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/events" component={Events}/>
                    <Route path={'/events/:eventId'} component={Event}/>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/editor" component={EventEditor}/>
                </div>
            </BrowserRouter>
        );
    }
};


render(<App />, document.getElementById('app'));    