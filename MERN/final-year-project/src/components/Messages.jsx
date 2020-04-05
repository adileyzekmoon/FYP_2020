import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';


class Messages extends Component {
  state = {
      user : this.props.location.state.user,
      patientData : this.props.location.state.patientData,
      messages:[
          {
              id: "firstMessage",
              from: "Dr. Stan",
              content: "Hi there, I'm your new doctor.",
              datatarget: "#collapseFirst",
              ariacontrols: "collapseFirst"
          },
          {
              id: "secondMessage",
              from: "Dr. Stan",
              content: "I'm lonely.",
              datatarget: "#collapseSecond",
              ariacontrols: "collapseSecond"
          }
      ],
      login: this.props.location.state.login,
      name : this.props.location.state.name,
  }

messageDisplay(){
    return ( <div className="accordion" id="accordionExample">
        {this.state.messages.map(message => 
         <div className="card">
    <div className="card-header" id={message.id}>
      <h2 className="mb-0">
        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={message.datatarget} aria-expanded="true" aria-controls={message.ariacontrols}>
          From: {message.from}
        </button>
      </h2>
    </div>

    <div id={message.ariacontrols} className="collapse show" aria-labelledby={message.id} data-parent="#accordionExample">
      <div className="card-body">
        {message.content}
      </div>
    </div>
  </div>
         )}
     </div>)
}

  render() {
    return (
        <div>
            <Navbar name= {this.state.name} user={this.props.location.state.user} login={this.state.login} patientData={this.state.patientData}/>
            <div className="container-fluid d-flex align-items-center justify-content-center h-100">
                <div className="row d-flex justify-content-center text-center w-100 m-2">
                    <div className="col">
                {this.messageDisplay()}
                        </div>
                </div>
            </div>
            
        </div>
        
    );
  }
}

export default Messages;
