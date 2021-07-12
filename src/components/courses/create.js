import React from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import useForm from "../hooks/form";
import cookie from "react-cookies";
import "./create.scss";

const axios = require("axios").default;
const api = "https://eraser-401.herokuapp.com";

const useStyles = makeStyles({
  text: {
    marginLeft: 490,
    marginTop: 30,
  },
  name: {
    marginLeft: 450,
  },
  multiline: {
    marginTop: 30,
    marginLeft: 450,
    width: 250,
  },
  button: {
    marginTop: 30,
    marginLeft: 520,
  },
});

const Create = () => {
  const [handleSubmit, handleChange] = useForm(callback);
  const history = useHistory();
  const classes = useStyles();
  const token = cookie.load("auth-token");

  function callback(data) {
    //console.log('inside the form course', myValue);
    let obj = {
      name: data.name_course,
      description: data.text_area,
    };
    console.log("the data is", data);
    console.log("my obj", obj);
    axios({
      method: "post",
      url: `/create-course`,
      mode: "cors",
      baseURL: api,
      data: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-origin": api,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("inside the then", response.data);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("inside the callback", data);
  }

  return (
    <>
      <React.Fragment>
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="card ">
                  
                  <Form className="formstyle" onSubmit={handleSubmit}>
                      <h3 className="main-heading">Create Course</h3>
                    <br />
                    <TextField
                      name="name_course"
                      type="text"
                      className="form-input"
                      label="course name"
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      name="text_area"
                      type="text"
                      className="form-input-des"
                      label="description"
                      multiline
                      rows={6}
                      defaultValue="Enter the course description"
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <br />
                    <Button
                      type="submit"
                      className="form-button"
                      variant="contained"
                    >
                      submit
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    </>
  );
};

export default Create;
