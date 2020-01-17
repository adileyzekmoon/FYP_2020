import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Submit from './Submit';
import Messages from './Messages';
import axios from 'axios';


class App extends Component {
  render() {
    return(
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/messages' component={Messages} />
                    <Route path='/submit' component={Submit} />
                </Switch>
            </Router>
    );
  }
}

export default App;
