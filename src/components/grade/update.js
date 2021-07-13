import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Button,TextField } from '@material-ui/core';
import useForm from '../hooks/form';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '90%',
    margin: '0 auto'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  inp: {
      margin: 5
  },
  upBtn: {
    float: 'right'
  }
}));


export default function SpringModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [handleSubmit, handleChange, values]= useForm(handleUpdate)
  function handleUpdate  (data) {
    console.log('in updaaaaaaaaaaaaaate', data)
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.upBtn} >
      <button className="btn btn-primary " type="button" onClick={handleOpen}>
        Update Grades
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <div className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <TextField className={classes.inp} onChange={handleChange} label="email" name="email" variant="filled" requierd/>
                <TextField className={classes.inp} onChange={handleChange} label="midExam" name="midExam" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="firstExam" name="firstExam" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="secondExam" name="secondExam" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="quizOne" name="quizOne" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="quizTwo" name="quizTwo" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="quizThree" name="quizThree" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="finalExam" name="finalExam" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="overAll" name="overAll" variant="filled" />
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>

      </Modal>
    </div>
  );
}