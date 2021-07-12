import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Typography, Grid} from '@material-ui/core/';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Delete from './deletecorse.js';
import CreateAssignment from './assignment/create';
import CreateQuiz from './quiz/create';
import Leave from './leave'



const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '90%',
    margin: '5px auto',
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [current, setCurrent] = useState({});
  const [ grade, setGrade ] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const token = cookie.load('auth-token');
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
        console.log('in my courses', data);
        setCurrent(data);
        let gradeData = data.grades;
        setGrade([...gradeData]);
        console.log('inside dsafsad', gradeData);
    })
      
  }, [])
  return (
  <>
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography variant="h2" gutterBottom>
                {current.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
            {current.description}
            </Typography>
            <CreateAssignment id={id} />
            <CreateQuiz id={id}/>
              <Delete /> 
              {/* <Grade/> */}
          </Paper>
          <Leave id={id}/>
        </Grid>

        </Grid>
      </div>
    </>
  );
}