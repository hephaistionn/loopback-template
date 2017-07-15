
import Reflux from 'reflux';
import React from 'react';

class Progressbar extends Reflux.Component { 
    
    constructor(props){
        super(props);
    }

    render() {
        return ( 
          <div className={'mdl-progress' + (this.props.progress!=100 ? 'is-active' : '') }>
            <div className='progressbar bar bar1' style={{width: this.props.progress+'%'}}></div>
          </div>
        );
    }
};

export default Progressbar;  