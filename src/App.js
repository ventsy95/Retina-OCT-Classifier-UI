import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import FileUpload from './components/file-upload/FileUpload';
import RegistrationForm from './components/register/RegistrationForm'
import LogIn from './components/login/LogIn'
import History from './components/history/History'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

class App extends Component {

  render() {
    return (
      <div>
          <div>
            <AnimatePresence>
            <Switch>
              <Route path='/login' component={LogIn} />
              <Route path="/register" component={RegistrationForm} />
              <div className="main-content">
                <div className="content">
                  <ProtectedRoute path="/fileUpload" component={FileUpload} />
                  <ProtectedRoute path="/history" component={History} />
                </div>
              </div>
            </Switch>
            </AnimatePresence>
          </div>
      </div >
    );
  }
}

export default App;