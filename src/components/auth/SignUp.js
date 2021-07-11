import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../context/authContext';
import {
  Typography,
  TextField,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Grid, Button
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/form'
import { signUp } from '../../features/actions/authActions'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import validteEmail from './validations';
import Alert from '@material-ui/lab/Alert';
import Show from '../Show'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    width: '60%',
    height: '40%',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function getSteps() {
  return ['Enter your personal information', 'Complete your info', 'Create a password'];
}

export default function SignUp() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [alertEmail, setAlertEmail] = useState(false)
  const [handleSubmit, handleChange, values] = useForm(getData);
  const context = useContext(AuthContext)
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className={classes.cont}>
            <div>

              <InputLabel id="labelF">First Name</InputLabel>
              <TextField labelId="labelF" id="outlined-basic" label="First Name" name="firstname" variant="outlined" type="text" item className={classes.name} onChange={handleChange} />
            </div>
            <div>

              <InputLabel id="labelL">Last Name</InputLabel>
              <TextField labelId="labelL" id="outlined-basic" label="Last Name" name="lastname" variant="outlined" type="text" item className={classes.name} onChange={handleChange} />
            </div>
            <div>

              <InputLabel id="labelE">Email</InputLabel>
              <TextField labelId="labelE" id="outlined-basic" label="Email" variant="outlined" name="email" type="email" onChange={handleChange} className={classes.name} />
            </div>


          </div>
        );
      case 1:
        return (
          <div className={classes.cont}>
            <div>

              <InputLabel id="label">Gender</InputLabel>
              <Select name="gender" labelId="label" id="select" onChange={handleChange} defaultValue="male">
                <MenuItem key="male" value="male">Male</MenuItem>
                <MenuItem key="female" value="female">Female</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel id="labelB">Birthday</InputLabel>
              <TextField
                labelId="labelB"
                name="birthdate"
                onChange={handleChange}
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

          </div>
        );
      case 2:
        return (<div className={classes.cont}>
          <div>
            <InputLabel id="labelP">Your Password</InputLabel>
            <TextField labelId="labelP" id="outlined-basic" label="Password" variant="outlined" name="pass" type="password" onChange={handleChange} />
          </div>
          <div>
            <InputLabel id="labelPP">Rewrite Your Password</InputLabel>
            <TextField labelId="labelPP" id="outlined-basic" label="Repeat Password" variant="outlined" name="repeat" type="password" onChange={handleChange} />
          </div>
        </div>);
      default:
        return 'Unknown stepIndex';
    }
  }
  async function getData(data) {
  
    let isValid = await validteEmail(data.email);
    if (isValid) {
      context.signup(data);
      setAlertEmail(false);
      setOpen(false);
      handleReset()
    } else {
      setAlertEmail(true);
    }


  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div><Typography className={classes.typography}>
          {/* <Grid container className={classes.grid}> <Logo className={classes.logo} /></Grid> */}
          {activeStep === steps.length ? (
            <div className={classes.cont}>
              <Typography className={classes.instructions}>All steps are completed</Typography>
              <Button variant="outlined" color="primary" type="submit" onClick={handleSubmit}>
                Sign Up
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </Typography>
        </div>
      </div>

    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Show condition={alertEmail}>
              <Alert severity="error">This is invalid Email Address — TRY AGAIN!</Alert>
            </Show>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}