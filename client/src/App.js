import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Landing from './Components/Landing';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './common/setToken';
import { currentUser, logoutUser } from './actions/authAction';
import Dashboard from './Components/DashBoard';
import { clearProfile } from './actions/profileActions';
import PrivateRoute from './common/PrivateRoute';
import CreateProfile from './Components/CreateProfile';
import EditProfile from './Components/EditProfile';
import AddMovie from './Components/AddMovie';
import AddShow from './Components/AddShow';
import AddSong from './Components/AddSong';

//check and set user if jwt is present in every page request
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const tokenDecoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(currentUser(tokenDecoded));
  //Check if expired token and if logaout and clear profile and redirect to login
  const now = Date.now() / 1000;
  if (tokenDecoded.exp < now) {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    console.log("Before Redirect to login -- logout");
    window.location.href = "/login";
  }
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
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
          </Switch>
          <Switch>
            <PrivateRoute path="/create-profile" component={CreateProfile} exact />
          </Switch>
          <Switch>
            <PrivateRoute path="/edit-profile" component={EditProfile} exact />
          </Switch>
          <Switch>
            <PrivateRoute path="/add-movie" component={AddMovie} exact />
          </Switch>
          <Switch>
            <PrivateRoute path="/add-song" component={AddSong} exact />
          </Switch>
          <Switch>
            <PrivateRoute path="/add-show" component={AddShow} exact />
          </Switch>
          <Footer />
          </div>
      </Router>   
      </Provider>
    )
  }
}

export default App;
