import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core/';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Grade from '../grade/exam.js';
import Delete from './deletecorse.js';
import CreateRoom from './CreateRoom';
import CreateAssignment from './assignment/create';
import CreateQuiz from './quiz/create';
import OpenRooms from './openRooms'
import io from 'socket.io-client';
import DeleteIcon from '@material-ui/icons/Delete';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
  deleteRooms:{
    marginLeft:"45%",
  }
  
}));

export const socket = io.connect('http://localhost:4000');
// export const socket = io.connect('https://eraser-401.herokuapp.com');

export default function CenteredGrid() {
  const classes = useStyles();
  const [current, setCurrent] = useState({});
  const [grade, setGrade] = useState([]);
  const [rooms, setRooms] = useState([])
  const { id } = useParams();

  useEffect(() => {
    socket.emit('give me the rooms', 'hi')

    socket.on('rooms', (data) => {
      setRooms(data)
    })

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
      setCurrent(data);
      let gradeData = data.grades;
      setGrade([...gradeData]);
    })

  }, [rooms])
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
              <CreateRoom id={id} />
              <CreateQuiz id={id} />
              <OpenRooms id={id} rooms={rooms} />
              <Delete />
              <Grade />
            </Paper>
            <Button
                className={classes.deleteRooms}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                Delete Rooms
              </Button>
          </Grid>

        </Grid>
      </div>
    </>
  );
}