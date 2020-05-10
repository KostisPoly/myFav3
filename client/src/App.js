import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Landing from './Components/Landing';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';

class App extends Component {
  render() {
    return (
      
      <Router>
        <div className="App">
          <NavBar />
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Footer />
          </div>
      </Router>
          
      
    )
  }
}

export default App;
