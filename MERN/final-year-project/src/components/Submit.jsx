import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';

class Submit extends Component {
  state = {
      user : "Patient",
      login : false,
      name : "Adil",
      patients : ["Adil", "Patrice", "Brandy"],
  }


  render() {
      return(    
        <div>
              <Navbar user={this.props.location.state.user}/>
              <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                  <div className="row">
                      <div className="col">
                          <div className="custom-file m-5">
                              <input type="file" class="custom-file-input" id="customFile"/>
                              <label className="custom-file-label" for="customFile">Choose file</label>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        
    );
  }
}

export default Submit;
