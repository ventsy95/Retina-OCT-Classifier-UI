import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import FileUpload from './components/file-upload/FileUpload';
import RegistrationForm from './components/register/RegistrationForm'
import LogIn from './components/login/LogIn'
import History from './components/history/History'

class App extends Component {

  render() {
    return (
      //<FileUpload></FileUpload>
      //<RegistrationForm></RegistrationForm>
      //<LogIn></LogIn>
      <History></History>
    );
  }
}

export default App;