import React from "react";
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
    multiline:{
        marginTop: 30,
        marginLeft: 450,
        width: 250,
        },
    button:{
        marginTop:30,
        marginLeft: 520,
    },
})

const Create = ()=>{
    const [handleSubmit, handleChange] = useForm(callback);
    const history = useHistory();
    const classes = useStyles();

    function callback(myValue){
        console.log('inside the form course', myValue);
        history.push('/');
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                    <Typography className={classes.text} > Create Course </Typography>
                    <br/>
                    <TextField name='name-course' type='text' className={classes.name} label='name course' onChange={handleChange} />
                    <br/>
                    <TextField name='text-area' type='text' className={classes.multiline} label='description' multiline rows={6} defaultValue='text' variant='outlined' onChange={handleChange} />
                    <br/>
                    <Button type='submit' className={classes.button} variant='contained' color='primary' > submit </Button>
            </Form>
        </>
    )
}

export default Create;