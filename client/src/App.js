import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Landing from './Components/Landing';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './common/setToken';
import { currentUser } from './actions/authAction';

//chack and set user if jwt is present in every page request
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const tokenDecoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(currentUser(tokenDecoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Footer />
          </div>
      </Router>   
      </Provider>
    )
  }
}
import { formatMs } from '@material-ui/core';

export default App;
