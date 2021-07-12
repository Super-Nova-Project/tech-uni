/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Container } from '@material-ui/core/';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Show from '../../Show'
// import {NavigateNext , ArrowBack} from '@material-ui/icons'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Timer from './timer';
import Slide from '@material-ui/core/Slide';
import { auto } from '@popperjs/core';

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
  result:{
    marginTop:'5%',
    textAlign:'center',
    backgroundColor:'lightgrey'
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

export default function OneQuiz() {
  const classes = useStyles();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [answers, setAnswers] = React.useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [elem, setElem] = useState(null)
  // const [timeLeft, setTimeLeft] = useState(0);
  // const [timer, setTimer] = useState(0);
  // const [loading, setLoading] = React.useState(true);
  const [finish, setFinish] = useState(false);
  const [start, setStart] = useState(false);
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
        if (quiz._id == quizID) {
        setCurrentQuiz(quiz);
        console.log('in data base',currentQuiz);
        let arr = shuffleArray(quiz.quizQuestions);
        setCurrentQuestion(arr[0])
        }
      });
    });
  }, []);

  function renderQuiz() {

    return (
      <div>
        <Show condition={!finish}>
          <Grid>
            <Container maxWidth="md">
              <h3> <strong>
                {currentQuestion.question}
              </strong>
              </h3>

              <form>
                <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup aria-label="quiz" name="quiz" onChange={handleRadioChange}>
                    {
                      currentQuestion.options.map((option, idx) => {
                        return (
                          <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                        )
                      })}
                  </RadioGroup>
                </FormControl>
                <Grid>
                  <Button disabled={currentQuestionIndex === 0} onClick={handleBack} variant="contained" className={classes.button}>
                    <ArrowBackIosIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={currentQuestionIndex === l - 1 ? handleResult : handleNext}
                    className={classes.button}
                  >
                    {currentQuestionIndex === l - 1 ? 'Finish' : <ArrowForwardIosIcon />}
                  </Button>
                </Grid>
              </form>
            </Container>
          </Grid >
        </Show>
        <Show condition={finish}>
          <Slide in={finish} direction="left">
            <Container maxWidth="md" className={classes.result}>
              <Typography variant="h3" gutterBottom>
                YOUR GRADE
              </Typography>
              <Typography variant="subtitle1">
                {grade} Out Of {l}
              </Typography>
            </Container>
          </Slide>
        </Show>
      </div>
    )
  }
  

  let l = currentQuiz.quizQuestions ? currentQuiz.quizQuestions.length : 0;

  const handleRadioChange = (event) => {
    let answer = event.target.value;
    if (currentQuestion.correct_answer === answer) {
      setGrade(grade + 1);
    }
    console.log(currentQuestion.correct_answer, grade, answer)
    setAnswers([...answers, answer]);

  };

  const handleBack = () => {
    console.log('-1');
    setCurrentQuestionIndex((prevActiveStep) => prevActiveStep - 1);
    setCurrentQuestion(currentQuiz.quizQuestions[currentQuestionIndex]);

  };

  const handleNext = () => {
    console.log('currentQuestionIndex', currentQuestionIndex);
    setCurrentQuestionIndex(prev => prev+1);
    console.log('currentQuestionIndex', currentQuestionIndex);
    console.log('CurrentQuestion', currentQuestion);
    setCurrentQuestion(currentQuiz.quizQuestions[currentQuestionIndex]);
    console.log('currentQuestion', currentQuestion);
    const d = renderQuiz();
    setElem(d)
  };

  const handleResult = () => {
    console.log('finish')
    setFinish(true);
  }

  const handleStart = () => {
    const d = renderQuiz();
    setElem(d)
    setStart(true);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2" gutterBottom>
              {currentQuiz.quizTitle}
            </Typography>
            <Show condition={!start}>
              <Button onClick={handleStart}
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"> Start Quiz
              </Button>
            </Show>
            <Show condition={start && !finish}>
              <Typography variant="subtitle1" gutterBottom>
                time remaining
                <Timer initialMinute={currentQuiz.timer} initialSeconds={0} />
              </Typography>
            </Show>
          </Paper>
          <Show condition={start}>
            {elem}
          </Show>
        </Grid>
      </Grid>

    </div>
  );
}