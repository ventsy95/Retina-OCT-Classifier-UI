import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FileUpload.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from '@fortawesome/fontawesome-free-solid'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, styled } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import NavigationBar from '../navigation-bar/NavigationBar';
import { motion } from "framer-motion";
import * as AppActions from "../../AppActions";

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative'
  },
});

class FileUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      open: false,
      predicted_disease: '',
      selected_image_base64: '',
      redirect: false,
      loading: false,
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
      .catch(err => { // then print response status
        if (err.response != undefined && err.response.status == 302) {
          this.setState({ redirect: true })
          localStorage.setItem('isLoggedIn', false);
          toast.error("Unauthorized.")
        } else {
          toast.error(err.message)
        }
        AppActions.isLoading(false);
      })
  }

  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files
    //define message container
    let err = []
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container   
        err[x] = files[x].type + ' is not a supported format\n';
      }
    };
    for (var z = 0; z < err.length; z++) {// if message not same old that mean has error 
      // discard selected file
      toast.error(err[z])
      event.target.value = null
    }
    return true;
  }

  maxSelectFile = (event) => {
    let files = event.target.files
    if (files.length > 1) {
      const msg = 'Only 1 image can be uploaded at a time'
      event.target.value = null
      toast.warn(msg)
      return false;
    }
    return true;
  }

  checkFileSize = (event) => {
    let files = event.target.files
    let size = 2000000
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n';
      }
    };
    for (var z = 0; z < err.length; z++) {// if message not same old that mean has error 
      // discard selected file
      toast.error(err[z])
      event.target.value = null
    }
    return true;
  }

  onChangeHandler = event => {
    var files = event.target.files
    if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0,
      })
    }
  }

  onClickHandler = () => {
    AppActions.isLoading(true);
    const data = new FormData()
    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append('image', this.state.selectedFile[x])
    }
    axios.post("https://dev.retina.classifier:5000/predict", data, { withCredentials: true })
      .then(res => { // then print response status
        this.setState({ predicted_disease: res.data[0].predicted_disease });
        this.getBase64(this.state.selectedFile[0]);
        AppActions.isLoading(false);
        this.handleOpen()
        toast.success('upload success');
      })
      .catch(err => { // then print response status
        if (err.response != undefined && err.response.status == 302) {
          this.setState({ redirect: true });
          localStorage.setItem('isLoggedIn', false);
          toast.error("Unauthorized.")
        } else {
          toast.error(err.message)
        }
        AppActions.isLoading(false);
      })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result)
      this.setState({ selected_image_base64: reader.result });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  savePrediction() {
    this.setState({ loading: true });
    const data = new FormData()
    data.append('image', this.state.selectedFile[0]);
    data.append('image_name', this.state.selectedFile[0].name);
    data.append('predicted_disease', this.state.predicted_disease);
    axios.post("https://dev.retina.classifier:5000/predictions", data, { withCredentials: true, maxRedirects: 0 })
      .then(res => { // then print response status
        console.log(res)
        toast.success(res.data);
        this.handleClose();
        this.setState({ loading: false });
      })
      .catch(err => { // then print response status
        if (err.response != undefined && err.response.status == 302) {
          this.setState({ redirect: true });
          localStorage.setItem('isLoggedIn', false);
          toast.error("Unauthorized.")
        } else {
          toast.error(err.message)
        }
        this.setState({ loading: false });
      })
  }

  render() {
    const { classes } = this.props;

    const { redirect } = this.state

    if (redirect) {
      return <Redirect to="/login" push={true} />
    }

    return (
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div className="top-nav">
          <NavigationBar />
        </div>
        <div className="container">
          <div className="row">
            <div className="file-pick-container">
              <div className="form-group files">
                <label className="select-file-text">Select Your File </label>
                <input type="file" className="form-control" accept="image/*" onChange={this.onChangeHandler} />
              </div>
              <div className="form-group">
                <ToastContainer />
              </div>
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button disabled={this.state.selectedFile == null} type="button" className="btn btn-success btn-block login100-form-btn" onClick={this.onClickHandler}>
                  <span>Check</span>
                </button>
              </div>
            </div>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.open}>
              <div className={classes.paper}>
                <div className="close-button">
                  <button type="button" onClick={this.handleClose}>
                    <FontAwesomeIcon icon={faTimes} size="2x" />
                  </button>
                </div>
                {this.state.selected_image_base64 ? <img className="prediction-image" src={this.state.selected_image_base64} /> : ''}
                <h2 id="transition-modal-title">{this.state.selectedFile != null && this.state.selectedFile[0].name}</h2>
                <h2 id="transition-modal-title">{this.state.predicted_disease}</h2>
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn" disabled={this.state.loading} onClick={() => this.savePrediction()}>
                  {this.state.loading && <FontAwesomeIcon icon={faSpinner} spin size="2x" />}
                  {!this.state.loading && <span>Save</span>}
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </motion.div>
    );
  }
}

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileUpload);