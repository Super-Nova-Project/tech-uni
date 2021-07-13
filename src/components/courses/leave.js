import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import { useHistory } from "react-router";

const useStyles = makeStyles({
    // button: {
    //     marginLeft: 100,
    //     position: 'relative',
    //     top: 58,
    // }
});

const API_SERVER = 'https://eraser-401.herokuapp.com';

const Delete = ({id}) => {
    const history = useHistory()
    const classes = useStyles();

    const handleDelete = () => {        
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/course/${id}/leave-course`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-origin': API_SERVER,
            Authorization: `Bearer ${token}`
        },
    }).then(async (c) => {
        let arraya = await c.json();
        history.push('/')
    })
}

return (
    <div className={classes.button}>
        <button
        className="btn btn-danger"
        onClick={handleDelete}
        >
        Leave This Course
        </button>
    </div>
  );
}

export default Delete;