
import Reflux from 'reflux';
import React from 'react';
import {StoreAlert, actionsAlert} from '../../stores/alert';

class Alert extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = StoreAlert; 
    }  

    _remove(index) {
        actionsAlert.remove(index);
    }

    render() {
        return (
            <div className='alert_list'> 
                {this.state.alerts.map((alert, index) =>
                        <div key={index}  className={'alert alert-'+alert.type}> 
                            <span className="closebtn" onClick={this._remove.bind(this, index)}>&times;</span> 
                            {alert.message}
                        </div>
                )} 
            </div>
        );
    }
};

export default Alert;  