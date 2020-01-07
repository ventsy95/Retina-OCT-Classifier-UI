import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/fontawesome-free-solid'
import { NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './LogIn.css';
import './Util.css';
import { motion } from "framer-motion";

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loading: false,
      redirect: false
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    var bodyFormData = new FormData();
    bodyFormData.set('email', this.state.email)
    bodyFormData.set('password', this.state.password)

    axios.post("https://dev.retina.classifier:5000/login", bodyFormData, { withCredentials: true })
      .then(res => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000)
        localStorage.setItem('isLoggedIn', true);
        this.setState({ redirect: true });
      })
      .catch((err) => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000)

        if (err.response !== undefined && err.response.status === 400) {
          toast.error("Invalid credentials.")
        } else {
          toast.error(err.message)
        }
      })
  }

  render() {
    const { redirect } = this.state

    if (redirect || localStorage.getItem('isLoggedIn') === 'true') {
      return <Redirect to="/fileUpload" push={true} />
    }

    return (
      <motion.div className="limiter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <ToastContainer />
        <div className="container-login100">
          <div className="login100-more"></div>
          <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
            <form method="POST" onSubmit={this.handleSubmit} className="login100-form validate-form">
              <span className="login100-form-title p-b-59">
                Log In
					    </span>

              <div className="wrap-input100 validate-input">
                <span className="label-input100">Email</span>
                <input className="input100" type="email" name="email" onBlur={this.handleChange} placeholder="Email address..." required />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <span className="label-input100">Password</span>
                <input className="input100" type="password" name="password" onBlur={this.handleChange} placeholder="*************" required />
                <span className="focus-input100"></span>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn" disabled={this.state.loading}>
                    {this.state.loading && <FontAwesomeIcon icon={faSpinner} spin size="2x" />}
                    {!this.state.loading && <span>Log In</span>}
                  </button>
                </div>
                <NavLink className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30" to="/register">Sign up</NavLink>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default LogIn;