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
import Spinner from './components/spinner-component/Spinner';
import AppStore from "./AppStore";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: AppStore.isAppLoading()
    }
  }

  componentDidMount() {
    AppStore.on("storeUpdated", this.updateSpinnerState);
  }

  componentWillUnmount() {
    AppStore.removeListener("storeUpdated", this.updateSpinnerState);
  }

  updateSpinnerState = () => {
    console.log("UPDATE STATE")
    this.setState({ loading: AppStore.isAppLoading() })
  };

  render() {
    return (
      <div>
        { this.state.loading && <Spinner /> }
        <div className={this.state.loading && 'section-blur' || ''}>
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