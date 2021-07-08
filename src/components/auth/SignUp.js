import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Modal from '@material-ui/core/Modal';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center'
    },
    root: {
        width: '100%',
        
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    name: {
        // marginRight: 20
    },
    cont: {
        width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    }
}));
function getSteps() {
    return ['Enter your personal information', 'Complete your info', 'Create a password'];
}

export default function SignUp() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [handleSubmit, handleChange, values] = useForm(getData);
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
                        <TextField labelId="labelE" id="outlined-basic" label="Email" variant="outlined" name="email" type="email" onChange={handleChange} className={classes.name}/>
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

    const state = useSelector(state => {
        return {
            SignUp: state.SignUp,
        }
    });

    const dispatch = useDispatch();

    function getData(data) {
        console.log(data, '----------');

        dispatch(signUp(data))
        setOpen(false);
        handleReset()
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
        <div>
            <Button type="button" onClick={handleOpen} variant="contained" color="primary">
                Sign Up
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}