import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Doctor extends Component {
  state = {
      user: this.props.location.state.user,
      login: this.props.location.state.login,
      patients : this.props.location.state.patients,
      patientData : this.props.location.state.patientData,
      predictionClasses: [0, 100, 12.5, 25, 37.5, 50, 62.5, 75, 87.5],
  }



patientGraph(patientData){
    if(this.state.patientData){
    console.log(patientData);
    var dateData = patientData.data;
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
				text: patientData.name
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
    
    return options}
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

renderGraphs(){    
    
    return(
        <div className="row d-flex justify-content-center text-center w-100 m-2">{ this.state.patientData.map(patientData => <div key={patientData.name} className="col-md-5"><CanvasJSChart options = {this.patientGraph(patientData)}
				/* onRef={ref => this.chart = ref} */
			/>
                    </div>)}</div>
            )
}

  render() {
    return (
        <div>
            <Navbar name= {this.state.name} user={this.state.user} login={this.state.login} patients= {this.state.patients}               
                />
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                {this.renderGraphs()}
            </div>
            
        </div>
        
    );
  }
}

export default Doctor;
