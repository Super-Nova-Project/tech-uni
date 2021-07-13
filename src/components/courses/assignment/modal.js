import React, { useEffect } from 'react';
import cookie from 'react-cookies';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';

const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles((theme) => ({
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
  },
  modalButton: {
    marginTop: 30,
  },
}));


export default function MyAssignment ({assignments, id}) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
//   const [ listTodo, setListTodo ] = React.useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    // const token = cookie.load('auth-token');
    // fetch(`${API_SERVER}/task`, {
    //     method: 'get',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-origin': API_SERVER,
    //         Authorization: `Bearer ${token}`
    //       },
    //   }).then(async (c) => {
    //       let data = await c.json();
    //       console.log('------------inside the list todo-------', data);
    //       setListTodo(()=>[...data]);
    //       console.log('list to do', listTodo);
    //   })
  },[])

  return (
    <div className={classes.modalButton}>
    <button type="button" className="btn btn-primary" onClick={handleOpen}>
      My Assignments
    </button>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <h3> Assignments </h3>
        {/* <UpdateComp/> */}
      </TableHead>
      <TableBody>
          <TableRow>
            <TableCell align="right">Assignment Title</TableCell>
            <TableCell align="right">Assignment Text</TableCell>
            <TableCell align="right">Due Date</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          {assignments.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
             <Link to={`course/${id}/assignment/${row._id}`} >{row.assignmentTitle}</Link> 
              </TableCell>
              <TableCell align="right">{row.assignmentText}</TableCell>
              <TableCell align="right">{row.due_date}</TableCell>
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </TableContainer>
        </div>
      </Fade>
    </Modal>
  </div>
  );
  
}