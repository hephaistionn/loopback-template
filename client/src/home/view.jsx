
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

class Home extends Reflux.Component { 
    
    constructor(props){
        super(props);
        this.store = Store; 
    }  

    _onChangeName(e) {
        actions.changeName(e.target.value);
    }

    _addName(e) {
        actions.addName(this.state.currentName);
        e.preventDefault();  
    }

    _removeName(e) {
        actions.removeName();
    }

    render() {
        return (
            <div className='home'> 
                <label> {this.props.label}</label>
                <form  onSubmit={this._addName.bind(this)}>
                    <input type="text" placeholder="Nom" value={this.state.currentName} onChange={this._onChangeName.bind(this)}/>
                    <input type="submit" value="Enregistrer" />
                </form>
                <ul>
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