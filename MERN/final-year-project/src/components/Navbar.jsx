import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Navbar extends Component {

    
//loginStatus(props){
//    if(this.props.login){
//        return (<ul className="navbar-nav ml-auto">
//                <li className="nav-item active">
//                    <Link to='/' className="nav-link" onClick={() => {this.props.onLogin(false)} }>Logout</Link>
//                </li>  
//            </ul>);
//    }
//    else{
//        return (<ul className="navbar-nav ml-auto">
//                <li className="nav-item">
//                    <a className="nav-link" href="#">Register</a>
//                </li>
//                <li className="nav-item">
//                    <Link to='/' className="nav-link" onClick={() => {this.props.onLogin(true)} }>Login</Link>
//                </li>    
//            </ul>);
//    }
//}
//
//searchStatus(props){
//    if(this.props.login){
//        return(<Link to="/search" className="nav-link">Search</Link>) 
//    }
//    else{
//        return(<a className="nav-link disabled" href="#" >Search</a>)
//    }
//}
  render() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={{pathname: '/', state: {user: this.props.user}}} className="navbar-brand display-4" href="#">PMS - {this.props.user}</Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={{pathname: '/submit', state: {user: this.props.user}}} className="nav-link">Submit</Link>
                </li>
                <li className="nav-item">   
                    <a className="nav-link" href="#" >History</a>
                </li>
                <li className="nav-item">
                    <Link to={{pathname: '/messages', state: {user: this.props.user}}} className="nav-link">Messages</Link>
                </li>
            </ul>
        </nav>
    );
  }
}

export default Navbar;
