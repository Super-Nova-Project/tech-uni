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
const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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
});

export default function LogMain() {
    const history = useHistory()
    const context = useContext(AuthContext)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [courses, setCourses] = useState([])
    const dispatch = useDispatch({setCourse})
    const handleCourse = myCourse => {
        dispatch(setCourse(myCourse))
        history.push(`/course/${myCourse.name}`)
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
        })
    }, [])

    return (
        <>
        {courses.map(course => {
                return (
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                name
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {course.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                description
                            </Typography>
                            <Typography variant="body2" component="p">
                            {course.description}
                            </Typography>
                            </CardContent>
                            <CardActions>
                            <Button size="small" onClick={()=> handleCourse(course)} >Go To Course</Button>
                        </CardActions>
                    </Card>
                )

            })
        }
        </>
    );
}