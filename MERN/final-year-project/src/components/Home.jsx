import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Home extends Component {
  state = {
      loginEmail: null,
      loginPassword: null,
      login: false
  }


loginHandler = event => {
    event.preventDefault();
    axios.post('http://localhost:3001/user/login', {
        email: this.state.loginEmail,
        password: this.state.loginPassword
    })
        .then(res => {if (res.data != ""){
            console.log(res);
            this.setState({name: res.data.name,
                           user: res.data.user,
                           loginEmail: null,
                           loginPassword: null,
                           login: true});
            if (res.data.user == "Patient"){
                this.setState({patientData: res.data.data})
            }
            if (res.data.user == "Doctor"){
                this.setState({patients : res.data.data,});
                var patientData = [];
                this.state.patients.forEach(patient => axios.get('http://localhost:3001/user/history', {params: {
                    name: patient,
                }}).then(res => patientData.push({name: patient,
                                                 data: res.data.data})));
                this.setState({patientData: patientData});
            }}
                      else 
                          this.setState({loginStatus: "Invalid username and password."})}
             );
}

onChange = event =>{
    this.setState({ [event.target.name]: event.target.value })
}

loginPage(){
    return(
        <div>
            <form>
                <div className="form-group m-5 ">
                    <label htmlFor="emailAddress">Email address</label>
                    <input type="email" className="form-control" id="emailAddress" name="loginEmail" aria-describedby="emailHelp" 
                    onChange={this.onChange}/> 
                
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" name="loginPassword" 
                    onChange={this.onChange}/>
                    <button type="submit" className="btn btn-primary mt-5" onClick={this.loginHandler}>Submit</button>
                <p>{this.state.loginStatus}</p>
                </div>
                
            </form>

        </div>
            
    )
}


  render() {
      if (this.state.login != true){
          return(<div>
                  <Navbar user="Login"/>
                  {this.loginPage()}
                  </div>
          )
      }
      if (this.state.login == true && this.state.user == "Patient"){
    return (
        <div>
            <Navbar name= {this.state.name} user={this.state.user} login={this.state.login} patientData={this.state.patientData}               
                />
            
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                  <div className="row">
                          <h1> Welcome, {this.state.name}</h1>                      
                  </div>
              </div>
            
            
        </div>
        
    );}
      else if (this.state.login == true && this.state.user == "Doctor"){
          return (
        <div>
            <Navbar name={this.state.name} user={this.state.user} login={this.state.login} patients= {this.state.patients} patientData={this.state.patientData}               
                />
            
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                  <div className="row">
                          <h1> Welcome, {this.state.name}</h1>                      
                  </div>
              </div>
            
        </div>
        
    );
      }
  }
}

export default Home;
