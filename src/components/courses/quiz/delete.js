import React from 'react';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies';
const API_SERVER = 'https://eraser-401.herokuapp.com';
export default function ContainedButtons({id, quizId}) {
  const classes = useStyles();
  const handleDelete = () => {
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/course/${id}/delete-qu/${quizId}`, {
        method: 'delete',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-origin': API_SERVER,
            Authorization: `Bearer ${token}`
        },
    }).then(async (c) => {
        let data = await c.json();
        console.log('in my courses', data);
    })
  }

  return <Button variant="contained" color="secondary" onClick={handleDelete}>Delete Quiz</Button>;
}