
import Reflux from 'reflux';
import React from 'react';
import {StoreList, actionsList} from '../../stores/list';
import {actionsAlert} from '../../stores/alert';

class Home extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = StoreList; 
    }  

    _onChangeName(e) {
        actionsList.changeName(e.target.value);
    }

    _addName(e) {
        actionsList.addName(this.state.currentName);
        e.preventDefault();  
    }

    _removeName(e) {
        actionsAlert.success('name removed');
        actionsList.removeName();
    }

    render() {
        return (
            <div className='home mdl-grid'>
                    <form className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col' onSubmit={this._addName.bind(this)}>
                        <label> {this.props.label}</label>
                        <input className='mdl-textfield__input' type='text' placeholder='Nom' value={this.state.currentName} onChange={this._onChangeName.bind(this)}/>
                        <input type='submit' value='Enregistrer' />
                    </form>
                    <ul className='mdl-cell mdl-cell--12-col'>
                    {this.state.names.map((name, index) =>
                            <li key={index}>{name}</li>
                    )} 
                    </ul> 
                    {this.state.names.length>0 && <button onClick={this._removeName.bind(this)}>delete</button>}
            </div>
        );
    }
};

export default Home;  