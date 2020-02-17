import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

class History extends Component {
  state = {
      user : "Patient",
      login : false,
      name : "Adil",
      patients : ["Adil", "Patrice", "Brandy"],
      history: [],
  }

getHistory = () => {
        axios.get('http://localhost:3001/user/history')
            .then(res => this.setState({history:res.data}));
    }



  render() {
    return (
        <div>
            <Navbar user={this.props.location.state.user}/>
            {this.getHistory()}
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                  <div className="row">
                      <div className="col">
                          { this.state.history.map(user => <h4 key={user._id}>{user.name} {user.date}</h4>)}
                      </div>
                  </div>
              </div>
            
            
        </div>
        
    );
  }
}

export default History;
