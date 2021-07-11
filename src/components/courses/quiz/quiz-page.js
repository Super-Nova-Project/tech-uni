/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Container } from '@material-ui/core/';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Question from './question';
import Button from '@material-ui/core/Button';
import Show from '../../Show'

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
  }
}));

function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function CenteredGrid() {
  const classes = useStyles();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(false);
  const [grade, setGrade] = useState(0);
  const { id, quizID } = useParams();

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
      // console.log({quizID})
      data.quizes.forEach(quiz => {
        if (quiz._id === quizID)
          setCurrentQuiz(quiz)
      });
    });
  }, []);

  let l = currentQuiz.quizQuestions ? currentQuiz.quizQuestions.length - 1 : 0 ;

  const handleBack = () => {
    // console.log('-1');
    setCurrentQuestion((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    // console.log('+1');
    setCurrentQuestion((prevActiveStep) => prevActiveStep + 1);
  };

  const handleResult = () => {
    setResult(true);
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2" gutterBottom>
              {currentQuiz.quizTitle}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              time remaining : {currentQuiz.timer} minutes
            </Typography>
          </Paper>
        </Grid>
        <Show condition={!result}>
          <Container maxWidth="md">
            <Question index={currentQuestion} question={currentQuiz.quizQuestions? currentQuiz.quizQuestions[currentQuestion] : {}} />
            <Grid>
              <Button disabled={currentQuestion === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={currentQuestion === l ? handleResult : handleNext}
                className={classes.button}
              >
                {currentQuestion === l ? 'Finish' : 'Next'}
              </Button>
            </Grid>
          </Container>
        </Show>
        
      </Grid>
      <Show condition={result}>
          Congrats!
      </Show>

    </div>
  );
}