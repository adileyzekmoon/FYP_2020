import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
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
  }

patientGraph(patient){
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
				title: "Week of Year",
				prefix: "W",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "Week {x}: {y}%",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 },
					{ x: 13, y: 55 },
					{ x: 14, y: 60 },
					{ x: 15, y: 56 },
					{ x: 16, y: 60 },
					{ x: 17, y: 59.5 },
					{ x: 18, y: 63 },
					{ x: 19, y: 58 },
					{ x: 20, y: 54 },
					{ x: 21, y: 59 },
					{ x: 22, y: 64 },
					{ x: 23, y: 59 }
				]
			}]
		}
    
    return options
}

renderGraphs(){    
    return(
        <div className="row d-flex justify-content-center text-center w-100 m-2">{ this.state.patients.map(patient => <div className="col-md-5"><CanvasJSChart options = {this.patientGraph(patient)}
				/* onRef={ref => this.chart = ref} */
			/>
                <div className="container-fluid d-flex align-items-center justify-content-center">
                <div className="row mt-5">
                    <div className="col-6">
                        <a href="#"><button type="button" className="btn btn-dark">Previous</button></a>
                    </div>
                    <div className="col-6">
                        <a href="#"><button type="button" className="btn btn-dark" disabled>Next</button></a>
                    </div>
                </div>
            </div>
                    </div>)}</div>
            )
}

patientGraph(patient){
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
				title: "Week of Year",
				prefix: "W",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "Week {x}: {y}%",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 },
					{ x: 13, y: 55 },
					{ x: 14, y: 60 },
					{ x: 15, y: 56 },
					{ x: 16, y: 60 },
					{ x: 17, y: 59.5 },
					{ x: 18, y: 63 },
					{ x: 19, y: 58 },
					{ x: 20, y: 54 },
					{ x: 21, y: 59 },
					{ x: 22, y: 64 },
					{ x: 23, y: 59 }
				]
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
                <div className="row d-flex justify-content-center text-center w-100 m-2"><div className="col-md-5"><CanvasJSChart options = {this.patientGraph(this.state.name)}
				/* onRef={ref => this.chart = ref} */
			/>
                <div className="container-fluid d-flex align-items-center justify-content-center">
                <div className="row mt-5">
                    <div className="col-6">
                        <a href="#"><button type="button" className="btn btn-dark">Previous</button></a>
                    </div>
                    <div className="col-6">
                        <a href="#"><button type="button" className="btn btn-dark" disabled>Next</button></a>
                    </div>
                </div>
            </div>
                    </div></div>
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
