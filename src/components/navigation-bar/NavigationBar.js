import React, { Component } from 'react';
import './NavigationBar.css';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          redirect: false,
        }
      }

    logOut = () => {
        axios.get("https://dev.retina.classifier:5000/logout", { withCredentials: true })
          .then(res => {
            localStorage.setItem('isLoggedIn', false);
            this.setState({ redirect: true })
            toast.info("Successfully logged out.")
          })
          .catch(err => {
            if (err.response !== undefined && err.response.status === 302) {
              this.setState({ redirect: true })
              localStorage.setItem('isLoggedIn', false);
              toast.error("Unauthorized.")
            } else {
              toast.error(err.message)
            }
          })
      }

    render() {
        const { redirect } = this.state

        if (redirect) {
          return <Redirect to="/login" push={true} />
        }

        return (
            <div className="hero-anime">
                { localStorage.getItem('isLoggedIn') === 'true' &&
                <div className="navigation-wrap bg-light start-header start-style">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <nav className="navbar navbar-expand-md navbar-light">

                                    <a className="navbar-brand" href="#/"><img src="https://i.ibb.co/XFW0r4J/vision.png" alt="vision" border="0" /></a>

                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>

                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ml-auto py-4 py-md-0">
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                                <NavLink className="nav-link" to="/">Home</NavLink>
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                                <NavLink className="nav-link" to="/fileUpload">Diagnose</NavLink>
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                                <NavLink className="nav-link" to="/history">History</NavLink>
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                                <button type="button" className="nav-link" onClick={this.logOut}>Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
    }
            </div>
        );
    }
}

export default NavigationBar;