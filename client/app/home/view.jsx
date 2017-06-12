
import Reflux from 'reflux';
import React from 'react';
import {Store, actions} from './model';

class Home extends Reflux.Component { 
    
    constructor(props){
        super(props);   
        this.state = {names:[], currentName:''};
        this.actions = actions;
        this.store = Store; 
    }  

    _onChangeName(e) {   
        this.setState({currentName: e.target.value});
    }

    _addName(e) {
        e.preventDefault();
        this.actions.addName(this.state.currentName);
        this.setState({currentName: ''});
    }

    _removeName(e) {
        e.preventDefault();
        this.actions.removeName();
    }

    render() {
        return (
            <div className='home'> 
                <label> {this.props.label} </label>
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