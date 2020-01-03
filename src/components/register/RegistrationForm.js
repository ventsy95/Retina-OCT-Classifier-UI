import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationForm.css';

const validEmailRegex =
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

const validateEmptyForm = (state) => {
  if ((state.email == null || state.email.length == 0) || (state.fullName == null || state.fullName.length == 0)
    || (state.password == null || state.password.length == 0) || (state.confirmPassword == null || state.confirmPassword.length == 0)) {
    return false;
  }
  return true;
}

class RegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      password: null,
      confirmPassword: null,
      errors: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const { password, confirmPassword } = this.state;

    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 3
            ? 'Full Name must be at least 3 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      case 'confirmPassword':
        errors.confirmPassword =
          password !== confirmPassword
            ? 'Passwords do not match!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
  }

  handlePasswordChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const { password, confirmPassword } = this.state;

    errors.confirmPassword = password !== confirmPassword ? 'Passwords do not match!' : '';

    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors) && validateEmptyForm(this.state)) {
      console.info('Valid Form');

      var bodyFormData = new FormData();
      bodyFormData.set('fullName', this.state.fullName)
      bodyFormData.set('email', this.state.email)
      bodyFormData.set('password', this.state.password)

      axios.post("https://dev.retina.classifier:5000/signup", bodyFormData)
        .then(res => { // then print response status
          console.log(res)
          toast.success('Successful registration.', {
            autoClose: 3000,
            onClose: () => console.log("REDIRECT TO LOGIN PAGE")
          });
        })
        .catch((err) => { // then print response status
          if (err.response.status === 409) {
            toast.error("Email is already registered.")
          } else {
            toast.error(err.message)
          }
        })
    } else {
      console.error('Invalid Form');
      toast.error('Invalid form!');
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="background">
        <div className="reg-container">
          <div className="main">
            <section className="signup">
              <div className="reg-container">
                <div className="signup-content">
                  <ToastContainer />
                  <form method="POST" id="signup-form" className="signup-form" onSubmit={this.handleSubmit} noValidate>
                    <h2 className="form-title">Create account</h2>
                    <div className="form-group">
                      <input type="text" className="form-input" name='fullName' onBlur={this.handleChange} noValidate id="name" placeholder="Your Name" required />
                      {errors.fullName.length > 0 &&
                        <span className='error'>{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-input" name='email' onBlur={this.handleChange} noValidate id="email" placeholder="Your Email" required />
                      {errors.email.length > 0 &&
                        <span className='error'>{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-input" name='password' onBlur={this.handleChange} noValidate id="password" placeholder="Password" required />
                      {errors.password.length > 0 &&
                        <span className='error'>{errors.password}</span>}
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-input" name="confirmPassword" onBlur={this.handleChange} onChange={this.handlePasswordChange} id="confirmPassword" placeholder="Repeat your password" required />
                      {errors.confirmPassword.length > 0 &&
                        <span className='error'>{errors.confirmPassword}</span>}
                    </div>
                    <div className="form-group">
                      <input type="submit" name="submit" id="submit" className="form-submit" value="Sign up" />
                      <NavLink to="/login"><input type='button' className="form-cancel" value='Cancel' /></NavLink>
                    </div>
                  </form>
                  <p className="loginhere">
                    Already have an account? <NavLink to="/login" className="loginhere-link">Login here</NavLink>
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;