/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Show from '../../Show';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  question: {
    padding: 30
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  result: {
    marginTop: '5%',
    textAlign: 'center',
    backgroundColor: 'lightgrey'
  }
}));

export default function OneAssignment() {
  const classes = useStyles();
  const token = cookie.load('auth-token');
  const [currentAssignment, setCurrentAssignment] = useState({});
  const [solution, setSolution] = React.useState([]);
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
    </div>
  );
}