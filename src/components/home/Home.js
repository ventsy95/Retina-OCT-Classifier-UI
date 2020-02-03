import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import { Redirect } from 'react-router-dom';
import NavigationBar from '../navigation-bar/NavigationBar';
import { motion } from "framer-motion";
import * as AppActions from "../../AppActions";
import Blog from "./blog/Blog"

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    AppActions.isLoading(true);
    axios.get("https://dev.retina.classifier:5000/", { withCredentials: true })
      .then(res => {
        localStorage.setItem('isLoggedIn', true);
        AppActions.isLoading(false);
      })
      .catch(err => {
        if (err.response !== undefined && err.response.status === 302) {
          this.setState({ redirect: true })
          localStorage.setItem('isLoggedIn', false);
          toast.error("Unauthorized.")
        } else {
          toast.error(err.message)
        }
        AppActions.isLoading(false);
      })
  }

  render() {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to="/login" push={true} />
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="top-nav">
          <NavigationBar />
        </div>
        <div className="home-container">
         <Blog></Blog>
        </div>
      </motion.div>
    );
  }
}

export default Home;