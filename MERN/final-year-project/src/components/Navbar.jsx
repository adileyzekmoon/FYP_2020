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
    if (this.props.user == "Doctor"){
        return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand display-4">PMS - {this.props.user}</a>
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={{pathname: '/patienthistory', state: {user: this.props.user, login:this.props.login, name: this.props.name, patients: this.props.patients, patientData: this.props.patientData}}} className="nav-link">Patient History</Link></li>
                </ul>
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={{pathname: '/', }} className="nav-link">Log out</Link></li>
                </ul>
        </nav>)
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand display-4">PMS - {this.props.user}</a>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={{pathname: '/submit', state: {user: this.props.user, login:this.props.login, name: this.props.name, patientData: this.props.patientData}}} className="nav-link">Submit</Link>
                </li>
                <li className="nav-item">   
                    <Link to={{pathname: '/history', state: {user: this.props.user, login:this.props.login, name: this.props.name, patientData: this.props.patientData}}} className="nav-link">History</Link>
                </li>
                <li className="nav-item">
                    <Link to={{pathname: '/messages', state: {user: this.props.user, login:this.props.login, name: this.props.name, patientData: this.props.patientData}}} className="nav-link">Messages</Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={{pathname: '/', }} className="nav-link">Log out</Link></li>
                </ul>
        </nav>
    );
  }
}

export default Navbar;
