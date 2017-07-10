
import Reflux from 'reflux';
import React from 'react';
import {Link} from 'react-router-dom'
import {StoreRequest} from '../../stores/request';

class Progressbar extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = StoreRequest;
    }

    render() {
        return ( 
          <div className={'mdl-progress' + (this.state.progress!=100 ? 'is-active' : '') }> 
            <div className='progressbar bar bar1' style={{width: this.state.progress+'%'}}></div>
          </div>
        );
    }
};

export default Progressbar;  