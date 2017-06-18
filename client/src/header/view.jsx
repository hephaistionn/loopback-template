
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

class Header extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.store = Store; 
    }

    static get defaultProps() {
        return {
          tilte: 'title'
        }
    } 

    render() {
        return (
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
            <div className="mdl-layout__drawer-button"><i className="material-icons"></i></div>
                    <h1 className="mdl-layout-title">{this.props.title}</h1>
                    <div className="mdl-layout-spacer"></div>
                    <nav className="mdl-navigation">
                      <a className="mdl-navigation__link" href="/">Home</a>
                      <a className="mdl-navigation__link" href="/events">Event</a>
                      <a className="mdl-navigation__link" href="/login">Login</a>
                      <a className="mdl-navigation__link" href="/editor">Editor</a>
                    </nav>
            </div>
          </header>
        );
    }
};

export default Header;  