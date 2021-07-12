import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import useForm from '../../hooks/form';
import cookie from 'react-cookies';
import { TextField, FormControl  } from '@material-ui/core';


const API_SERVER = 'https://eraser-401.herokuapp.com';
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '90%',
        left: '50%',
        top: '50%',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        display: 'flex',
        flexFlow: 'wrap',
        height: 'auto',
        justifyContent: 'left',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            padding: '20px 0 7px',
        },
    },
    space: {
        height: 40
    }
}));

export default function CreateQuiz({ id }) {
    const classes = useStyles();
    const [handleSubmit, handleChange, values] = useForm(newQuiz)
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const [num, setNum] = React.useState([1, 1, 1, 1, 1]);
    const [questionList, setQuestionList] = React.useState([])
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addQues = (e) => {
        e.stopPropagation();
        e.preventDefault()
        const question = e.target.question.value;
        const answer = e.target.answer.value;
        const option1 = e.target.options[0].value;
        const option2 = e.target.options[1].value;
        const option3 = e.target.options[0].value;
        let obj = {
            question, answer, options : [answer, option1, option2, option3]
        }
        setQuestionList(prev => [...prev, obj])
        e.target.reset()
    }


    async function newQuiz(data) {
        const token = cookie.load('auth-token');
        console.log('in quiz', data);
        let obj = {
            ...data, quizQuestions: questionList
        }
        console.log('in quiz', obj);
        const response = await fetch(`${API_SERVER}/course/${id}/create-quiz`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        });
        let result = await response.json();
        console.log('in quiz result', result);
        handleClose()
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {/* <form className={classes.root} noValidate autoComplete="off" onSubmit={ e=> e.preventDefault()}> */}
                <div className={classes.root}>

                    <TextField
                        id="filled-multiline-flexible"
                        label="Quiz Title"
                        name="quizTitle"
                        multiline
                        rowsMax={2}
                        onChange={handleChange}
                        variant="filled"
                        required
                    />
                </div>
                <h4>You Added {questionList.length} Questions</h4>
                <form onSubmit={addQues} className={classes.root}>
                        <TextField
                            id="filled-multiline-flexible"
                            label="Question"
                            name="question"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Answer"
                            name="answer"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Option1"
                            name="options"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Option2"
                            name="options"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Option3"
                            name="options"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <Button type="submit" >Add This Question</Button>
                    </form>
                    <div className={classes.root}>

                    <TextField
                        id="filled-multiline-flexible"
                        label="Duration in minutes"
                        name="timer"
                        rowsMax={1}
                        onChange={handleChange}
                        variant="filled"
                        required
                    />
                    </div>
               
                <div className={classes.button}>
                    <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
                        Create Assignment
                    </Button>
                </div>
            {/* </form> */}
        </div>
    );

    return (
        <div>
            <Button type="button" variant="contained" color="primary" onClick={handleOpen}>
                Create Quiz
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