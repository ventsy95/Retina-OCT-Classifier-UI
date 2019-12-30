import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import FileUpload from './components/file-upload/FileUpload';
import RegistrationForm from './components/register/RegistrationForm'

class App extends Component {

  render() {
    return (
      //<FileUpload></FileUpload>
      <RegistrationForm></RegistrationForm>
    );
  }
}

export default App;