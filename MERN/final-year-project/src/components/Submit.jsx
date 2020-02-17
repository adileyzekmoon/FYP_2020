import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';

class Submit extends Component {
  state = {
      user : "Patient",
      login : false,
      name : "Adil",
      patients : ["Adil", "Patrice", "Brandy"],
      date: new Date().toLocaleString(),
      selectedFile: null,
      loadingState: true,
      model : null,
      recovData: [
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
				],
      result: null,
  }

    async componentDidMount() {
        const model = await tf.loadLayersModel('http://localhost:3001/machinelearning/CNN/model.json');
        model.summary();
        this.setState({model: model,
                      loadingState: false,})
}

    loadingState = () => {
        if (this.state.loadingState){
            return(
                <h1>Loading model</h1>
                )
        }
        else{
            return(
                <h1>Model loaded</h1>
                )
        }
    }


    addToDb = () => {
    axios.post('http://localhost:3001/user/add', {
        name: this.state.name,
        date: this.state.date,
        recovData: this.state.recovData
    });
    }
    
    fileHandler=event=>{
    this.setState({
        selectedFile: event.target.files[0],
        canvasImage: URL.createObjectURL(event.target.files[0]),
    })
  }
    uploadFileName = () => {
        if (this.state.selectedFile === null){
            return("Choose File")
        }
        else return (this.state.selectedFile.name)
    }
    
    onClickHandler = event => {
        var inputData3D = tf.browser.fromPixels(document.getElementById("inputImage"));
        inputData3D = tf.image.resizeBilinear(inputData3D, [160,120])
        const inputData4D = inputData3D.expandDims();
        this.state.model.predict(inputData4D).print();
    }
    
    buttonClass = () => {
        if (this.state.selectedFile === null) {
            return(
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler} disabled>Predict</button>)
        }
        else return(
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Predict</button>
        )
    }


  render() {
      return( 
        <div>
              <Navbar user={this.props.location.state.user}/>
              <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                  <div className="row">
                      <div className="col">
                          {this.loadingState()}                      
                      </div>
                  </div>
                  <div className="row">
                      <div className="col">
                          <img id="inputImage" src={this.state.canvasImage}/>
                          <div className="custom-file m-5">
                              <input type="file" className="custom-file-input" id="customFile" onChange={this.fileHandler}/>
                              <label className="custom-file-label" htmlFor="customFile">{this.uploadFileName()}</label>
                              {this.buttonClass()}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        
    );
  }
}

export default Submit;
