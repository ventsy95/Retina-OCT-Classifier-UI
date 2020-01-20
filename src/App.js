import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import FileUpload from './components/file-upload/FileUpload';
import RegistrationForm from './components/register/RegistrationForm'
import LogIn from './components/login/LogIn'
import History from './components/history/History'
import Home from './components/home/Home'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import { Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Spinner from './components/spinner-component/Spinner';
import AppStore from "./AppStore";
import { ToastContainer } from 'react-toastify';

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
    this.setState({ loading: AppStore.isAppLoading() })
  };

  render() {
    return (
      <div>
      <ToastContainer />
        { this.state.loading && <Spinner /> }
        <div className={(this.state.loading && 'section-blur') || ''}>
          <AnimatePresence>
            <Switch>
              <Route path='/login' component={LogIn} />
              <Route path="/register" component={RegistrationForm} />
              <div className="main-content">
                <div className="content">
                  <ProtectedRoute path="/" component={Home} />
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