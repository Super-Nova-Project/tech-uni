import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));


export default function Question(props) {

  console.log({props})
  // const question = props.question ? props.question : [];
  const [question , setQuestion] = React.useState([]);
  const classes = useStyles();
  const [answers, setAnswers] = React.useState([]);

  useEffect(() =>{
    setQuestion(props.question);
  },[])
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleRadioChange = (event) => {
    setAnswers([...answers , event.target.value]);
  };

  return (
    <>
      <h3> <strong>
        {question.question}
      </strong>
      </h3>

      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup aria-label="quiz" name="quiz" onChange={handleRadioChange}>
            {question.options.map((option, idx) =>{
              return (
                <FormControlLabel key={idx} value={`option${idx}`} control={<Radio />} label={option}/>
              )
            })}
          </RadioGroup>
        </FormControl>
      </form>
    </>
  );
}