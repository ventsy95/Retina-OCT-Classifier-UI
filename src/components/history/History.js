import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './History.css';
import { withStyles, makeStyles, styled } from '@material-ui/core/styles';
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
import { faEdit } from '@fortawesome/fontawesome-free-solid'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative'
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
      rowsPerPage: 5,
      page: 0,
      open: false,
      selected_prediction: null
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
    let matching = this.state.predictions.filter(row => row.record_id == record_id)
    this.setState({ selected_prediction: matching[0], open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getHistoryOfPredictions();
  }

  getHistoryOfPredictions() {
    console.log("GET")
    axios.get("https://dev.retina.classifier:5000/predictions", { withCredentials: true })
      .then(res => { // then print response status
        console.log(res.data)
        this.setState({ predictions: res.data })
        toast.success('upload success')
      })
      .catch(err => { // then print response status
        console.log(err)
        toast.error('upload fail')
      })
  }

  render() {
    const { predictions } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Paper>
          <TableContainer component={Paper}>
            <ToastContainer />
            <Table aria-label="customized table">
              <TableHead>
                <TableRow className="history-head">
                  <StyledTableCell>Image name</StyledTableCell>
                  <StyledTableCell>Disease</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {predictions != null && (this.state.rowsPerPage > 0
                  ? predictions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                  : predictions
                ).map(row => (
                  <StyledTableRow key={row.record_id} hover>
                    <StyledTableCell component="th" scope="row">{row.image_name}</StyledTableCell>
                    <StyledTableCell>{row.predicted_disease}</StyledTableCell>
                    <StyledTableCell>{row.prediction_timestamp}</StyledTableCell>
                    <StyledTableCell><button type="button" onClick={() => this.handleOpen(row.record_id)}>
                      <FontAwesomeIcon icon={faEdit} /></button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {predictions != null &&
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      count={predictions.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  }
                </TableRow>
              </TableFooter>
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
              {this.state.selected_prediction ? <img className="prediction-image" src={`data:image/png;base64,${this.state.selected_prediction.image}`} /> : ''}
              <h2 id="transition-modal-title">{this.state.selected_prediction != null && this.state.selected_prediction.predicted_disease}</h2>
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button type="submit" className="login100-form-btn">
                  <span>Export to PDF</span>
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(History);