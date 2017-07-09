
import {render} from 'react-dom';
import Reflux from 'reflux';
import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'

//PAGES
import Home from './components/home/view'; 
import Header from './components/header/view';
import Login from './components/login/view';
import Events from './components/events/view';
import Event from './components/event/view';
import EventEditor from './components/eventEditor/view';
import Signup from './components/signup/view';
import Progressbar from './components/progressbar/view';
import Alert from './components/alert/view';
import Reset from './components/reset/view';


//STORE
import {StoreAuth, actionsAuth} from './stores/auth';

class App extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = StoreAuth;
    }

    componentDidMount() {
        actionsAuth.getProfile();
    } 

    render() {
        return (
            <BrowserRouter>
                <div className='mdl-layout'> 
                    <Header title='My template' profile={this.state.profile}/>
                    <Progressbar />
                    <Alert />
                    <div className='mdl-layout__content'>
                        <div className='mdl-grid'>
                            <div className='mdl-layout-spacer'></div> 
                            <div className='mdl-cell mdl-cell--6-col box-shadow'>  
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/events' component={Events}/>
                                <Route exact path={'/events/:eventId'} component={Event}/>
                                <Route exact path={'/events/:eventId/editor/'} component={EventEditor}/>
                                <Route exact path={'/editor/'} component={EventEditor}/>
                                <Route exact path='/login' component={Login}/>
                                <Route path='/signup' component={Signup}/>
                                <Route path='/reset' component={Reset}/>
                            </div>  
                            <div className='mdl-layout-spacer'></div>
                        </div>         
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};


render(<App />, document.getElementById('app'));    