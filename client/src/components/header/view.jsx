
import Reflux from 'reflux';
import React from 'react';
import {Link} from 'react-router-dom'
import {actionsMember} from '../../stores/member';

class Header extends Reflux.Component {

    constructor(props){
        super(props);
    }

    static get defaultProps() {
        return {
          tilte: 'title',
          profile: null
        }
    }

    logout(e) {
        e.preventDefault();
        actionsMember.logout();
    }

    render() {

        const nav  = [];
        if(this.props.profile){
          nav.push(<Link className='mdl-navigation__link' key={0} to={'/'}>Home</Link>);
          nav.push(<Link className='mdl-navigation__link' key={1} to={'/events'}>Event</Link>);
          nav.push(<a className='mdl-navigation__link' onClick={this.logout} key={3}>Logout</a>);
        }else{
          nav.push(<Link className='mdl-navigation__link' key={0} to={'/'}>Home</Link>);
          nav.push(<Link className='mdl-navigation__link' key={1} to={'/events'}>Event</Link>);
          nav.push(<Link className='mdl-navigation__link' key={2} to={'/login'}>Login</Link>);
          nav.push(<Link className='mdl-navigation__link' key={3} to={'/signup'}>Signup</Link>);
        }

        return (
          <header className='mdl-layout__header'>

            <div className='mdl-layout__header-row'>
            <div className='mdl-layout__drawer-button'><i className='material-icons'></i></div>
                    <h1 className='mdl-layout-title'>{this.props.title}</h1>
                    <div className='mdl-layout-spacer'></div>
                    <nav className='mdl-navigation'>
                      {nav}
                    </nav>
            </div>
          </header>
        );
    }
};

export default Header;
