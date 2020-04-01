import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Navbar extends Component {

render() {
    if (this.props.user == "Login"){
        return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={{pathname: '/', state: {user: this.props.user}}} className="navbar-brand display-4">PMS - {this.props.user}</Link>
        </nav>)
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={{pathname: '/', state: {user: this.props.user, login:this.props.login}}} className="navbar-brand display-4">PMS - {this.props.user}</Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={{pathname: '/submit', state: {user: this.props.user, login:this.props.login}}} className="nav-link">Submit</Link>
                </li>
                <li className="nav-item">   
                    <Link to={{pathname: '/history', state: {user: this.props.user, login:this.props.login}}} className="nav-link">History</Link>
                </li>
                <li className="nav-item">
                    <Link to={{pathname: '/messages', state: {user: this.props.user, login:this.props.login}}} className="nav-link">Messages</Link>
                </li>
            </ul>
        </nav>
    );
  }
}

export default Navbar;
