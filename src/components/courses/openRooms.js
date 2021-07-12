


import React from "react";
import { useHistory } from "react-router-dom";

const OpenRooms = (props) => {

    const history = useHistory();
    function test(room) {
        const url = `${room.course}/${room.id}`
        history.push(`/course/${url}`);
    }
    return props.rooms.map((room) => {
        if (room.course === props.id) {
            return (
                <p  onClick={() => test(room)}>{room.id} / {room.id}</p>
            );
        }else{
            return (<p></p>)
        }
    })
};

export default OpenRooms;
