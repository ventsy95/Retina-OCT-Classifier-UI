import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './History.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faTrashAlt } from '@fortawesome/fontawesome-free-regular'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavigationBar from '../navigation-bar/NavigationBar';
import { motion } from "framer-motion";
import * as AppActions from "../../AppActions";
import MyDocument from '../pdf/MyDocument'
import { PDFDownloadLink } from '@react-pdf/renderer';

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
    position: 'relative',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
});

const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      predictions: null,
      rowsPerPage: 7,
      page: 0,
      open: false,
      selected_prediction: null,
      redirect: false,
      person_name: '',
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleOpen = (record_id) => {
    let matching = this.state.predictions.filter(row => row.record_id === record_id)
    this.setState({ selected_prediction: matching[0], open: true });
  };

  handleClose = () => {
    this.setState({ open: false, person_name: '', selected_prediction: null });
  };

  componentDidMount = () => {
    AppActions.isLoading(true);
    this.getHistoryOfPredictions();
  }

  getHistoryOfPredictions = () => {
    axios.get("https://dev.retina.classifier:5000/predictions", { withCredentials: true })
      .then(res => {
        res.data = res.data.sort(function (var1, var2) {
          var a = new Date(var1.prediction_timestamp), b = new Date(var2.prediction_timestamp);
          if (a > b)
            return -1;
          if (a < b)
            return 1;

          return 0;
        });
        this.setState({ predictions: res.data })
        AppActions.isLoading(false);
      })
      .catch(err => {
        if (err.response !== undefined && err.response.status === 302) {
          toast.error("Unauthorized.")
          localStorage.setItem('isLoggedIn', false);
          this.setState({ redirect: true });
        } else if(err.message !== undefined){
          toast.error(err.message)
        }
        AppActions.isLoading(false);
      })
  }

  deleteRecord = (record) => {
    AppActions.isLoading(true);
    const data = new FormData()
    data.append('predicted_disease', record.predicted_disease);
    data.append('age', record.age);
    data.append('race', record.race);
    data.append('gender', record.gender);
    data.append('record_id', record.record_id);
    axios.post("https://dev.retina.classifier:5000/delete-prediction", data, { withCredentials: true })
      .then(res => {
        var array = [...this.state.predictions]; // make a separate copy of the array
        var index = array.indexOf(record)
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({predictions: array});
        }
        AppActions.isLoading(false);
        toast.success("Successfully deleted record.");
      })
      .catch(err => {
        if (err.response !== undefined && err.response.status === 302) {
          toast.error("Unauthorized.")
          localStorage.setItem('isLoggedIn', false);
          this.setState({ redirect: true });
        } else if(err.message !== undefined){
          toast.error(err.message)
        }
        AppActions.isLoading(false);
      })
  };

  handleFormChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case 'fullName': this.setState({ person_name: value }); break;
      default: console.log("Unsupported event.");
    }
  }

  render() {
    const { predictions } = this.state;
    const { classes } = this.props;
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to="/login" push={true} />
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="top-nav">
          <NavigationBar />
        </div>
        <div className="history-container">
          <label className="history-text">History</label>
          <Paper>
            {predictions != null && predictions.length === 0 &&
              <span className="empty-history-text">Your history does not contain any records.</span>}
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                {predictions != null && predictions.length > 0 &&
                  <TableHead>
                    <TableRow className="history-head">
                      <StyledTableCell>Image name</StyledTableCell>
                      <StyledTableCell>Disease</StyledTableCell>
                      <StyledTableCell>Age</StyledTableCell>
                      <StyledTableCell>Gender</StyledTableCell>
                      <StyledTableCell>Ethnicity</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                }
                <TableBody>
                  {predictions != null && (this.state.rowsPerPage > 0
                    ? predictions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                    : predictions
                  ).map(row => (
                    <StyledTableRow key={row.record_id} hover>
                      <StyledTableCell component="th" scope="row">{row.image_name}</StyledTableCell>
                      <StyledTableCell>{row.predicted_disease}</StyledTableCell>
                      <StyledTableCell>{row.age}</StyledTableCell>
                      <StyledTableCell>{row.gender}</StyledTableCell>
                      <StyledTableCell>{row.race}</StyledTableCell>
                      <StyledTableCell>{row.prediction_timestamp}</StyledTableCell>
                      <StyledTableCell><button type="button" onClick={() => this.handleOpen(row.record_id)}>
                        <FontAwesomeIcon icon={faFileAlt} size="2x" /></button></StyledTableCell>
                      <StyledTableCell><button type="button" onClick={() => this.deleteRecord(row)}>
                        <FontAwesomeIcon icon={faTrashAlt} size="2x" /></button></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                {predictions != null && predictions.length > 0 &&
                  <TableFooter>
                    <TableRow>
                      {predictions != null &&
                        <TablePagination
                          rowsPerPageOptions={[5, 7, 10, 25, 50]}
                          count={predictions.length}
                          rowsPerPage={this.state.rowsPerPage}
                          page={this.state.page}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                      }
                    </TableRow>
                  </TableFooter>
                }
              </Table>
            </TableContainer>
          </Paper>
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
                  <button type="button" onClick={() => this.handleClose()}>
                    <FontAwesomeIcon icon={faTimes} size="2x" />
                  </button>
                </div>
                {this.state.selected_prediction ? <img className="prediction-image" alt="retina-oct" src={`data:image/png;base64,${this.state.selected_prediction.image}`} /> : ''}
                <h2 id="transition-modal-title">{this.state.selected_prediction != null && this.state.selected_prediction.predicted_disease}</h2>
                <div>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="fullName" name='fullName' label="Full Name" variant="outlined" value={this.state.person_name} onChange={this.handleFormChange} onBlur={this.handleFormChange} />
                  </form>
                </div>
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="button" className="login100-form-btn">
                    <PDFDownloadLink document={
                    <MyDocument 
                    diagnosis={this.state.selected_prediction != null && this.state.selected_prediction.predicted_disease} 
                    fullName={this.state.person_name} 
                    age={this.state.selected_prediction != null && this.state.selected_prediction.age} 
                    gender={this.state.selected_prediction != null && this.state.selected_prediction.gender} 
                    race={this.state.selected_prediction != null && this.state.selected_prediction.race} 
                    image={this.state.selected_prediction != null && this.state.selected_prediction.image} />} 
                    fileName="export.pdf" 
                    className="pdf-export-button">
                      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Export to PDF')}
                    </PDFDownloadLink>
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

History.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(History);