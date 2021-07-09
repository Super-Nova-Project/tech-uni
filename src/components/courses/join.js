import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import useForm from '../hooks/form'

const useStyles = makeStyles({
    text:{
        marginLeft: 490,
        marginTop: 30,
    },
    name:{
        marginLeft: 450,
    },
    button:{
        marginTop:30,
        marginLeft: 520,
    },
})

const Join = ()=>{

    const [handleSubmit, handleChange] = useForm(callback);
    const history = useHistory();
    const classes = useStyles();

    function callback(value){
        console.log('side inside the join course', value);
        history.push('/create-course');
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Typography className={classes.text} > Join Your Course </Typography>
                    <br/>
                <TextField name='name-course' type='text' className={classes.name} label='id number' onChange={handleChange} />
                    <br/>
                <Button type='submit' className={classes.button} variant='contained' color='primary' > submit </Button>
            </Form>
        </>
    )
}

export default Join;