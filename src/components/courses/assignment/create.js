import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import useForm from '../../hooks/form';
import cookie from 'react-cookies';
import { TextField, Input } from '@material-ui/core';
import { useHistory } from 'react-router';

const API_SERVER = 'https://eraser-401.herokuapp.com';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    left: '50%',
    top: '50%',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: 'flex',
    flexFlow: 'wrap',
    height: 'auto',
    justifyContent: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      padding: '20px 0 7px',
    },
  },
  space: {
    height: 40
  },
  modal: {
    // width:200
  }
}));

export default function CreateAssignment({ id }) {
  const classes = useStyles();
  const history = useHistory();
  const [handleSubmit, handleChange, values] = useForm(newAssignment);
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFileChange = event => {
    // Update the state 
    setAssignmentFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    // Create an object of formData 
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      "myFile",
      assignmentFile,
      assignmentFile.name
    );

    // Details of the uploaded file 
    console.log(assignmentFile);
    // Request made to the backend api 
    // Send formData object 
    // axios.post("api/uploadfile", formData);
  };

  async function newAssignment(data) {
    onFileUpload();
    // setFile(data);
    data = {...data , assignmentFile}
    console.log(data, ',,,,,')

    const token = cookie.load('auth-token');
    console.log('in assign', data);
    const response = await fetch(`${API_SERVER}/course/${id}/create-assignment`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': API_SERVER,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    let result = await response.json();
    console.log('in assign result', result);
  }

  function upload(){  

  
    const fileData = () => {
      if (assignmentFile) {
  
        return (
          <div>
            <h2>File Details:</h2>
            <p>File Name: {assignmentFile.name}</p>
            <p>File Type: {assignmentFile.type}</p>
            <p>
              Last Modified:{" "}
              {assignmentFile.lastModifiedDate.toDateString()}
            </p>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };

      return (
        <div>
          <div>
            <Input type="file" name="assignmentFile" onChange={onFileChange} />
          </div>
          {fileData()}
        </div>
      );
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>

          <TextField
            id="filled-multiline-flexible"
            label="Assignment Title"
            name="assignmentTitle"
            multiline
            rowsMax={2}
            onChange={handleChange}
            variant="filled"
            required
          />
        </div>
        <br />

        <div>

          <TextField
            id="date"
            label="Due Date"
            type="date"
            name="due_date"
            className={classes.textField}
            minDate={new Date()}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}

            required
          />
        </div>
        <br />

        <div>

          <TextField
            id="filled-textarea"
            label="Assignment Text"
            name="assignmentText"
            placeholder="Placeholder"
            multiline
            variant="filled"
            onChange={handleChange}
            required
          />
        </div>
        <br />
        {upload()}
        <div className={classes.button}>
          <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
            Create Assignment
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Button type="button" variant="contained" color="primary" onClick={handleOpen}>
        Create Assignment
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {body}
      </Modal>
    </div>
  );
}