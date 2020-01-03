import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import FileUpload from './components/file-upload/FileUpload';
import RegistrationForm from './components/register/RegistrationForm'
import LogIn from './components/login/LogIn'
import History from './components/history/History'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import NavigationBar from './components/navigation-bar/NavigationBar';

class App extends Component {

  render() {
    return (
      <div>
        <HashRouter>
        <div className="top-nav">
          <NavigationBar />
        </div>
        <div>
            <div className="main-content">
              <div className="content">
                <Switch>
                  <Route path='/login' component={LogIn} />
                  <ProtectedRoute path="/fileUpload" component={FileUpload} />
                  <Route path="/register" component={RegistrationForm} />
                  <ProtectedRoute path="/history" component={History} />
                </Switch>
              </div>
            </div>
        </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;