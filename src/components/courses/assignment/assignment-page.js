import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Show from '../../Show';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Paper, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { BorderAllRounded } from '@material-ui/icons';
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
  }
}));

export default function OneAssignment() {
  const classes = useStyles();
  const token = cookie.load('auth-token');
  const [currentAssignment, setCurrentAssignment] = useState({});
  const [solution, setSolution] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { id, assID } = useParams();

  useEffect(() => {
    console.log(loading)
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
        }
        setLoading(false)
      });
    });
    console.log(loading)

  }, []);

  function renderFilePreview() {

    return (
      <div>

      </div>
    )
  }


  const handleSubmitAssignment = () => {
    const token = cookie.load('auth-token');
    const obj = {
      solution: solution
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
    })
      .catch(function (error) {
        console.log(error);
      });

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
        <Typography variant="h3" gutterBottom>
          {currentAssignment.assignmentTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Due Date : </strong>{currentAssignment.due_date}
        </Typography>
      </Box>
      <Button color="primary" variant="contained" className={classes.start}>Start Assignment</Button>

      <Box className={classes.ass}>
        <Typography className={classes.text}>
          {console.log(currentAssignment)}
          {currentAssignment.assignmentText}
        </Typography>
      </Box>
      
    </div>
  );
}