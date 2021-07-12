import React from "react";
import { v1 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import {socket} from './course'
import { Button } from "@material-ui/core";

const CreateRoom = (props) => {
    const history = useHistory();
    function create() {
        const id = uuid();
        socket.emit('createCourse', { course: props.id, id })
        history.push(`/course/${props.id}/${id}`);
    }

    return (
        <Button type="button" variant="contained" color="primary" onClick={create}>Create room</Button>
    );
};

export default CreateRoom;
