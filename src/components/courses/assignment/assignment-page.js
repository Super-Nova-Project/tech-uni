import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Show from '../../Show';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Typography, useForkRef } from '@material-ui/core';
import { Button, TextareaAutosize } from '@material-ui/core';
import useForm from '../../hooks/form';
import {useHistory} from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  ass: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
    // width: '75%'
  },
  title: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  text: {
    alignContent: 'center',
    padding: theme.spacing(2),
    width: '50%',
    border: '2px grey solid',
    borderRadius: 20,
    boxShadow: '0 8px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  solution: {
    alignContent: 'center',
    padding: theme.spacing(2),
    width: '45%'
  },
  submit: {
    padding: theme.spacing(2),
  }
}));

export default function OneAssignment(props) {
  const classes = useStyles();
  const token = cookie.load('auth-token');
  const history = useHistory();
  const [currentAssignment, setCurrentAssignment] = useState({});
  const [handleSubmit, handleChange, values] = useForm(getData);
  const [loading, setLoading] = React.useState(true);
  const [start, setStart] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const { id, assID } = useParams();

  useEffect(() => {
    fetch(`${API_SERVER}/course/${id}`, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': API_SERVER,
        Authorization: `Bearer ${token}`
      },
    }).then(async (c) => {
      let data = await c.json();
      // console.log({quizID})
      data.assignments.forEach(assignment => {
        if (assignment._id === assID) {
          // assignment.due_date = assignment.due_date.toDateString();
          setCurrentAssignment(assignment);
          setLoading(false);
        }

      });
    });
    // console.log(loading)
    console.log({currentAssignment});
  }, []);

  function getData(data) {
    setLoading(true);
    console.log(data.solution);

    const token = cookie.load('auth-token');
    console.log(data.solution)
    const obj = {
      email:props.email,
      solution: data.solution
    }
    //TO save the solution in the database
    axios({
      method: 'post',
      url: `/course/${id}/${assID}/submit-assignment`,
      mode: 'cors',
      baseURL: API_SERVER,
      data: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': API_SERVER,
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      // console.log(res);
      setLoading(false);
      setFinish(true);
      // history.push(`course/${id}`);
    })
      .catch(function (error) {
        console.log(error);
      });

    // submitAssignment(solution);
  }
  // function renderFilePreview() {

  //   return (
  //     <div>

  //     </div>
  //   )
  // }

  const handleStart = () => {
    setStart(true)
  }

  const submitAssignment = (solution) => {
   
    //to save the grade in the database
    // axios({
    //   method: 'post',
    //   url: `/course/${id}/${quizID}/submit-quiz`,
    //   mode: 'cors',
    //   baseURL: API_SERVER,
    //   data: JSON.stringify(obj),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-origin': API_SERVER,
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // console.log('finish')
  }

  return (
    <div>

      <Box className={classes.title}>
        <Show condition={loading}>
          <CircularProgress />
        </Show>
        <Typography variant="h3" gutterBottom>
          {currentAssignment.assignmentTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Due Date : </strong>{currentAssignment.due_date}
        </Typography>
      </Box>
      <Show condition={!start}>
        <Button color="primary"
          variant="contained"
          className={classes.start}
          onClick={handleStart}
        >
          Start Assignment
        </Button>
      </Show >

      <Box className={classes.ass}>
        <Typography className={classes.text}>
          {currentAssignment.assignmentText}
        </Typography>
      </Box>

      <Show condition={start && !finish}>
        <Box>
          <form onSubmit={handleSubmit} className={classes.ass}>
            <TextareaAutosize className={classes.solution}
              onChange={handleChange}
              maxRows={50}
              placeholder="Submit your Solution Text Or link for external file"
              name="solution"
            />
            <Button variant="contained" className={classes.submit} type="submit">Submit Assignment</Button>
          </form>

        </Box>

      </Show>
      <Box className={classes.title}>
        <Show condition={loading}>
          <CircularProgress />
        </Show>
        <Show condition={finish}>
          <Typography variant="h3" gutterBottom>
            You Submitted Successfully
          </Typography>
        </Show>
      </Box>

    </div >
  );
}