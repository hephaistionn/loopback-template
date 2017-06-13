
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

class Header extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.actions = actions;
        this.store = Store; 
    }

    static get defaultProps() {
        return {
          tilte: 'title'
        }
    } 

    render() {
        return (
            <div className='header'> 
               <h1>{this.props.title}</h1>
            </div>
        );
    }
};

export default Header;  