import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

class History extends Component {
  state = {
      user : "Patient",
      name : "Adil",
      patients : ["Adil", "Patrice", "Brandy"],
      history: {data: [{date:null}]},
      login: this.props.location.state.login,
  }

componentDidMount() {
    axios.get('http://localhost:3001/user/history', {params: {
            name: this.state.name,
        }})
            .then(res => this.setState({history:res.data}));
}

dataMap(){
    if (this.state.history != ""){
        return(
            <div className="col">
                {this.state.history.data.map(data => <p key={data.date}>{data.date}</p>)}
            </div>)
    }
}



  render() {
    return (
        <div>
            <Navbar user={this.props.location.state.user} login={this.state.login} />

            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                  <div className="row">
                          {this.dataMap()}                      
                  </div>
              </div>
            
            
        </div>
        
    );
  }
}

export default History;
