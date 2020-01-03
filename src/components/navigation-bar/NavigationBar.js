import React, { Component } from 'react';
import './NavigationBar.css';
import { NavLink } from "react-router-dom";

class NavigationBar extends Component {

    render() {
        return (
            <div className="hero-anime">
                <div className="navigation-wrap bg-light start-header start-style">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <nav className="navbar navbar-expand-md navbar-light">

                                    <a className="navbar-brand" target="_blank"><img src="http://starfinderoptical.com/wp-content/uploads/2019/02/VisiontestIcon001-300x150.png" alt="" /></a>

                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>

                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ml-auto py-4 py-md-0">
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                                                <NavLink className="nav-link" to="/">Home</NavLink>
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                                <NavLink className="nav-link" to="/fileUpload">Diagnose</NavLink>
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                                <NavLink className="nav-link" to="/history">History</NavLink>
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-1">
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-1">
                                            </li>
                                            <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavigationBar;