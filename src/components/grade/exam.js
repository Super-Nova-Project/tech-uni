import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from "react-router";
import cookie from 'react-cookies';
//import FormGrad from '../grade/form_table.js';

const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    button: {
        marginTop: 20,
        marginRight: 70,
    }
});

function MyVerticallyCenteredModal(props) {

    const classes = useStyles();
    const [ grade, setGrade ] = React.useState([]);

    const { id } = useParams();

    useEffect(() => {
        const token = cookie.load('auth-token');
        fetch(`${API_SERVER}/course/${id}`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER,
                Authorization: `Bearer ${token}`
            },
        }).then(async (c) => {
            let data = await c.json();
            console.log('in my courses', data);
            let array = data.grades;
            setGrade([...array]);
            console.log('inside exam component', array);
    })
    },[])

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Grade
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <h3> Grade </h3>
      </TableHead>
      <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">First Exam</TableCell>
            <TableCell align="right">Mid Exam</TableCell>
            <TableCell align="right">Second Exam</TableCell>
            <TableCell align="right">Final Exam</TableCell>
            <TableCell align="right">One Quiz</TableCell>
            <TableCell align="right">Two Quiz</TableCell>
            <TableCell align="right">Three Quiz</TableCell>
            <TableCell align="right">Over All</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          {grade.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.firstExam}</TableCell>
              <TableCell align="right">{row.midExam}</TableCell>
              <TableCell align="right">{row.secondExam}</TableCell>
              <TableCell align="right">{row.finalExam}</TableCell>
              <TableCell align="right">{row.quizOne}</TableCell>
              <TableCell align="right">{row.quizTwo}</TableCell>
              <TableCell align="right">{row.quizThree}</TableCell>
              <TableCell align="right">{row.overAll}</TableCell>
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </TableContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function Exam(props) {
      const classes = useStyles();
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button className={classes.button} variant="primary" onClick={() => setModalShow(true)}>
          Grade
        </Button>
  
        <MyVerticallyCenteredModal grade={props.grade} 
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
export default Exam;