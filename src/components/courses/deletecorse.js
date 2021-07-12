import React from 'react';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import cookie from 'react-cookies';

const useStyles = makeStyles({
    button: {
        marginLeft: 100,
        position: 'relative',
        top: 58,
    }
});

const API_SERVER = 'https://eraser-401.herokuapp.com';

const Delete = () => {

    const classes = useStyles();
    const [ deleteItem, setDeleteItem ] = React.useState([]);

    const { id } = useParams();

    const handleClick = () => {        
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/course/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-origin': API_SERVER,
            Authorization: `Bearer ${token}`
        },
    }).then(async (c) => {
        let arraya = await c.json();
        console.log('in my courses----', arraya);
        setDeleteItem(arraya)
        console.log('my courses-----', deleteItem);
    })
}

return (
    <div className={classes.button}>
        <button
        className="btn btn-danger"
        onClick={()=>{handleClick(deleteItem.id)}}
        >
        <DeleteSweepIcon />
        </button>
    </div>
  );
}

export default Delete;