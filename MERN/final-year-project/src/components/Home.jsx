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
      login : false,
      name : "Adil",
      patients : ["Adil", "Patrice", "Brandy"],
      history: null,
  }

componentDidMount() {
    axios.get('http://localhost:3001/user/history', {params: {
            name: this.state.name,
        }})
            .then(res => this.setState({history:res.data}));
}

renderGraphsDoc(){    
    return(
        <div className="row d-flex justify-content-center text-center w-100 m-2">{ this.state.patients.map(patient => <div className="col-md-5"><CanvasJSChart options = {this.patientGraph(patient)}
				/* onRef={ref => this.chart = ref} */
			/>
                    </div>)}</div>
            )
}

renderGraphsPat(patient){
    if (this.state.history != null){
    return(
        <div className="row d-flex justify-content-center text-center w-100 m-2">
            <div className="col-md-5"><CanvasJSChart options = {this.patientGraph(patient)}
				/* onRef={ref => this.chart = ref} */
			/>
                    </div></div>
            )}
}

patientGraph(patient){
    var dateData = this.state.history.data;
    console.log(dateData);
    var datePoints = [];
    const initialDate = new Date(dateData[0].date);
    console.log(initialDate);
    dateData.forEach(element => {
        const currentDate = new Date(element.date);
        var dateDiff = (currentDate - initialDate)/ (1000*60*60*24);
        console.log(dateDiff);
        datePoints.push({x: dateDiff,
                        y: element.result})
    })
    console.log(datePoints);
    
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
				type: "line",
				toolTipContent: "Day {x}: {y}%",
				dataPoints: datePoints,
			}]
		}
    
    return options
}


  render() {
      if (this.state.user == "Patient"){
    return (
        <div>
            <Navbar user={this.state.user}                
                />
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                {this.renderGraphsPat(this.state.name)}
            </div>
            
        </div>
        
    );}
      else if (this.state.user == "Doctor"){
          return (
        <div>
            <Navbar user="Doctor"                
                />
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                {this.renderGraphs()}
            </div>
            
        </div>
        
    );
      }
  }
}

export default Home;
