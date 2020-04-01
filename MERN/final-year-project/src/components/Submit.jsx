import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';

class Submit extends Component {
  state = {
      user : this.props.location.state.user,
      name : this.props.location.state.name,
      patients : ["Adil", "Patrice", "Brandy"],
      date: new Date().toLocaleString(),
      selectedFile: null,
      loadingState: true,
      canvasImage: null,
      model : null,
      predictionClasses: ['0%', '100%'  , '12.5%', '25%', '37.5%', '50%', '62.5%', '75%', '87.5%'],
      result: null,
      login: this.props.location.state.login,
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
                <div className="alert alert-danger" role="alert">Loading model</div>
                )
        }
        else{
            return(
                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                    Model loaded
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                )
        }
    }


    addToDb = event => {
    axios.post('http://localhost:3001/user/add', {
        name: this.state.name,
        date: this.state.date,
        result: this.state.result
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
        var prediction = this.state.model.predict(inputData4D);
        prediction = prediction.flatten();
        console.log(prediction.print());
        const predictedClass = prediction.argMax().dataSync();
        console.log(predictedClass);
        const result = this.state.predictionClasses[predictedClass[0]];
        const date = new Date();
        this.setState({result: predictedClass[0],
                      date: date.toString()});
        console.log(result);
        console.log(date)
    }
    
    predictButton = () => {
        if (this.state.selectedFile === null) {
            return(
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler} disabled>Predict</button>)
        }
        else return(
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Predict</button>
        )
    }
    
    submitButton = () => {
        if (this.state.result === null) {
            return(
            <button type="button" className="btn btn-primary btn-block" onClick={this.addToDb} disabled>Submit</button>)
        }
        else return(
            <button type="button" className="btn btn-primary btn-block" onClick={this.addToDb}>Submit</button>
        )
    }
    
    renderImage = () => {
        if (this.state.canvasImage === null){
            return(
                <div className="alert alert-secondary" role="alert">No image uploaded</div>
            )
        }
        else return(
            <img id="inputImage" src={this.state.canvasImage} height="200"/>
        )
    }


  render() {
      return( 
        <div>
              <Navbar name= {this.state.name} user={this.props.location.state.user} login={this.state.login} />
              
              <div className="container d-flex align-items-center justify-content-center my-5">
                  <div className="row">
                      <div className="col">
                          {this.renderImage()}
                      </div>
                  </div>
              </div>
              <div className="container d-flex align-items-center justify-content-center my-5">
                  <div className="row">
                      <div className="col">
                          <h1>{this.state.predictionClasses[this.state.result]}</h1>
                      </div>
                  </div>
              </div>
              <div className="container-fluid d-flex align-items-center justify-content-center">
                  <div className="row">
                      <div className="col">
                          <div className="custom-file">
                              <input type="file" className="custom-file-input" id="customFile" onChange={this.fileHandler}/>
                              <label className="custom-file-label" htmlFor="customFile">{this.uploadFileName()}</label>
                              {this.predictButton()}
                              {this.submitButton()}
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="container-fluid d-flex align-items-center justify-content-center my-5">
                  <div className="row ">
                      <div className="col">
                          {this.loadingState()}                      
                      </div>
                  </div>
              </div>
          </div>
        
    );
  }
}

export default Submit;
