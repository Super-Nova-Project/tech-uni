import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
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
import { useEffect } from 'react';
import Logo from '../basics/Logo'
import useForm from '../hooks/form'
import { signUp } from '../../features/actions/authActions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  typography: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(1),
  },
  name: {
    margin: 'auto',
  },
  grid: {
    justifyContent: "space-between",
  },
  logo: {
    maxWidth: 100,
    textAlign: 'center',
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [handleSubmit, handleChange, values] = useForm(getData);

  const state = useSelector(state => {
    return {
      SignUp: state.SignUp,
    }
  });

  const dispatch = useDispatch();

  function getData(data) {
    console.log(data, '----------');
    dispatch(signUp(dispatch, data))
  }

  useEffect(() => {
    setAnchorEl(props.anchorElSignup)
  }, [props.anchorElSignup]);


  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'signup' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={props.anchorEl}
      onClose={handleClose}
      className="pop"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Typography className={classes.typography}>
        <Grid container className={classes.grid}> <Logo className={classes.logo} /></Grid>
        <FormGroup className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit}>
          <Grid container className={classes.grid}>
            <TextField id="outlined-basic" label="First Name" name="firstname" variant="outlined" type="text" item className={classes.name} onChange={handleChange} />
            <TextField id="outlined-basic" label="Last Name" name="lastname" variant="outlined" type="text" item className={classes.name} onChange={handleChange} />
          </Grid>
          <TextField id="outlined-basic" label="Email" variant="outlined" name="email" type="email" onChange={handleChange} />
          <TextField id="outlined-basic" label="Password" variant="outlined" name="pass" type="password" onChange={handleChange} />
          <TextField id="outlined-basic" label="Repeat Password" variant="outlined" name="repeat" type="password" onChange={handleChange} />

          <Grid container className={classes.grid}>
            <InputLabel id="label">Gender</InputLabel>
            <Select labelId="label" id="select" onChange={handleChange} defaultValue="male">
              <MenuItem key="male" value="male">Male</MenuItem>
              <MenuItem key="female" value="female">Female</MenuItem>
            </Select>

            <TextField
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
          </Grid>
          <Button variant="outlined" color="primary" type="submit" onClick={handleSubmit}>
            Sign Up
          </Button>
        </FormGroup >
      </Typography>
    </Popover>

  );
}