import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../features/reducers/currentCourse';
import { useHistory } from "react-router";
import cookie from 'react-cookies';
import Paper from '@material-ui/core/Paper';
import Todo from '../listTodo/list.js';
const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cont: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#fafafa',
    },
    paper: {
        transition: 'all .5s ease',
        '&:hover': {
            backgroundColor: '#e1def3',
            transform: 'scale(1.1)'
        },
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',
            height: '100%',
        },
        margin: theme.spacing(2),
    },
    todo: {
        position: 'relative',
        top:'-100px',
        left: '94%',
        "@media (max-width: 770px)": {
            left: '2%'
        },
    },
    heading: {
        width:'100%',
       textAlign:'center'
    }
}));

export default function LogMain() {
    const history = useHistory()
    const context = useContext(AuthContext)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [courses, setCourses] = useState([])
    const dispatch = useDispatch({ setCourse })
    const handleCourse = myCourse => {
        dispatch(setCourse(myCourse))
        history.push(`/course/${myCourse.id}`)
    }
    useEffect(() => {
        const token = cookie.load('auth-token');
        fetch(`${API_SERVER}/my-courses`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER,
                Authorization: `Bearer ${token}`
            },
        }).then(async (c) => {
            let arraya = await c.json();
            console.log('in my courses', arraya);
            setCourses(arraya)
            console.log('my courses', courses);
        })
    }, [])

    return (
        <>

            <div className={classes.cont}>
                <Typography variant="h2" color="primary" className={classes.heading} gutterBottom>
                    My Courses
                </Typography>
                <div className={classes.todo}>
                    <Todo />
                </div>
                {courses.map(course => {
                    return (

                        <Card className={classes.paper + ' col-md-3'}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Name
                                </Typography>
                                <div>

                                    <Typography variant="h5" component="h2">
                                        {course.name}
                                    </Typography>
                                </div>
                                <Typography className={classes.pos} color="textSecondary">
                                    Description
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {course.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleCourse(course)} color="primary">Go To Course</Button>
                            </CardActions>
                        </Card>
                    )

                })
                }
            </div>
        </>
    );
}