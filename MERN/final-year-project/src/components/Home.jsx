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
      user : "Patient",
      patients : ["Adil", "Patrice", "Brandy"],
      history: null,
      predictionClasses: [0, 100, 12.5, 25, 37.5, 50, 62.5, 75, 87.5],
      loginEmail: null,
      loginPassword: null,
      login: false
  }

componentDidUpdate() {
    axios.get('http://localhost:3001/user/history', {params: {
            name: this.state.name,
        }})
        .then(res => this.setState({history:res.data}));
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
                           loginEmail: null,
                           loginPassword: null,
                           login: true})}
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
                <div className="form-group">
                    <label htmlFor="emailAddress">Email address</label>
                    <input type="email" className="form-control" id="emailAddress" name="loginEmail" aria-describedby="emailHelp" 
                    onChange={this.onChange}/> 
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" name="loginPassword" 
                    onChange={this.onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.loginHandler}>Submit</button>
                <p>{this.state.loginStatus}</p>
            </form>

        </div>
            
    )
}

renderGraphsDoc(){
    if (this.state.history != null && this.state.history != 0){
    return(
        <div className="row d-flex justify-content-center text-center w-100 m-2">{ this.state.patients.map(patient => <div className="col-md-5"><CanvasJSChart options = {this.patientGraph(patient)}
				/* onRef={ref => this.chart = ref} */
			/>
                    </div>)}</div>
            )}
}

renderGraphsPat(patient){
    if (this.state.history != null && this.state.history != 0){
        return(
        <div className="row d-flex justify-content-center text-center w-100 m-2">
            <div className="col-md-5"><CanvasJSChart options = {this.patientGraph(patient)}
				/* onRef={ref => this.chart = ref} */
			/>
                    </div></div>
        )
    }
    else return(
        <h1>No data yet.</h1>
    )
}

patientGraph(patient){
    var dateData = this.state.history.data;
    console.log(dateData);
    var xPoints = [];
    var yPoints = [];
    var datePoints = [];
    var recovDate = [];
    recovDate.push({x: 0,
                   y: 0})
    const initialDate = new Date(dateData[0].date);
    console.log(initialDate);
    dateData.forEach(element => {
        const currentDate = new Date(element.date);
        var dateDiff = (currentDate - initialDate)/ (1000*60*60*24);
        console.log(dateDiff);
        xPoints.push(dateDiff);
        yPoints.push(this.state.predictionClasses[element.result])
        datePoints.push({x: dateDiff,
                        y: this.state.predictionClasses[element.result]})
    })
    console.log(datePoints);
    
    const projectedRecoveryDate = this.findLineByLeastSquares(xPoints, yPoints);
    
    recovDate.push({x: projectedRecoveryDate,
                     y: 90,
//                     markerColor: "red",
//                     markerType: "triangle",
//                     indexLabel: "Projected recovery date",
//                     indexLabelOrientation: "vertical"
                    });
    
    const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: patient
			},
			axisY: {
				title: "Recovery Rate",
				includeZero: false,
				suffix: "%"
			},
			axisX: {
				title: "Days since start",
				prefix: "D",
				interval: 2
			},
			data: [{
				type: "spline",
                name: "Recovery timeline",
				toolTipContent: "Day {x}: {y}%",
				dataPoints: datePoints,
                showInLegend: true
			},
                  {
				type: "line",
                      name: "Projected recovery",
				toolTipContent: "Day {x}: {y}%",
                lineDashType: "dash",
				dataPoints: recovDate,
                      showInLegend: true
			}]
		}
    
    return options
}

findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;

    /*
     * We'll use those variables for faster read/write access.
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    /*
     * Nothing to do.
     */
    if (values_length === 0) {
        return [ [], [] ];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     * x = (y - b) / m
     */
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;
    
    return (90 - b) / m; 

    /*
     * We will make the x and y result line now
     */
//    var result_values_x = [];
//    var result_values_y = [];
//
//    for (var v = 0; v &lt; values_length; v++) {
//        x = values_x[v];
//        y = x * m + b;
//        result_values_x.push(x);
//        result_values_y.push(y);
//    }
//
//    return [result_values_x, result_values_y];
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
            <Navbar user={this.state.user} login={this.state.login}               
                />
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                {this.renderGraphsPat(this.state.name)}
            </div>
            
        </div>
        
    );}
      else if (this.state.login == true && this.state.user == "Doctor"){
          return (
        <div>
            <Navbar user="Doctor"  login={this.state.login}               
                />
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                {this.renderGraphsDoc()}
            </div>
            
        </div>
        
    );
      }
  }
}

export default Home;
