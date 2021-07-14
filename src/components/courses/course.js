import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core/';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Delete from './deletecorse.js';
import CreateRoom from './CreateRoom';
import CreateAssignment from './assignment/create';
import CreateQuiz from './quiz/create';
import OpenRooms from './openRooms'
import io from 'socket.io-client';
import DeleteIcon from '@material-ui/icons/Delete';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Leave from './leave';
import MyAssignment from './assignment/modal.js';
import MyQuizzes from './quiz/modal';
import { useHistory } from 'react-router-dom';
import Auth from '../auth/auth.js';
import { AuthContext } from '../../context/authContext.js';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './course.scss'


const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '90%',
    margin: '5px auto',

  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  deleteRooms: {
    marginLeft: "45%",
  },
  center: {
    width: '100%',
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
    marginTop: -37
  }

}));

export const socket = io.connect('https://eraser-401.herokuapp.com');

export default function CenteredGrid() {
  const history = useHistory()
  const classes = useStyles();
  const [current, setCurrent] = useState({});
  const [rooms, setRooms] = useState([])
  const [grade, setGrade] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const { id } = useParams();
  const context = useContext(AuthContext)

  useEffect(()=>{
    
    socket.on('rooms', (data) => {
      setRooms(data)
    })
  },[rooms])

  useEffect(() => {
   
    socket.emit('give me the rooms', 'hi')
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
      setAssignment(data.assignments)
      setQuiz(data.quizes)
    })

  }, [])
  const goToStudents = () => {
    history.push(`/course/${id}/students`)
  }

  const DeleteTheRooms=()=>{
    socket.emit('deleteTheRooms',id)
  }
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Button onClick={()=> history.push('/')} ><ArrowBackIosIcon/> Back</Button>
              <Auth cond={context.loggedIn && context.user.email != current.owner}>
                <div className={classes.right}>

                <Leave id={id} />
                </div>
              </Auth>
              <Typography className={classes.center} variant="h2" gutterBottom>
                {current.name}
              </Typography>
              <Typography className={classes.center} variant="subtitle1" gutterBottom>
                {current.description}
              </Typography>
              <div className="btncourse">
              <MyAssignment id={id} assignments={assignment} />
              <MyQuizzes id={id} quiz={quiz} />
              </div>
              <Auth cond={context.loggedIn && context.user.email == current.owner}>
                <div className="btncourse2">
                <button type="button" className="btn btn-primary" onClick={goToStudents}>Students Grades</button>
                <CreateAssignment id={id} owner={current.owner} style={{margin:20}} />
                <CreateQuiz id={id} owner={current.owner} />
                </div>
                <CreateRoom id={id} owner={current.owner} />
                <Delete owner={current.owner} />
                <button type="button" className="btn btn-primary" style={{marginTop:20}}startIcon={<DeleteIcon />} onClick={DeleteTheRooms}>Delete Rooms</button>
              </Auth>
              <OpenRooms id={id} rooms={rooms} />
              
            </Paper>

          </Grid>

        </Grid>
      </div>
    </>
  );
}


