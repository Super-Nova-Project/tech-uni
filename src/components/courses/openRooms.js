


import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";




const OpenRooms = (props) => {
    const history = useHistory();
    function test(room) {
        const url = `${room.course}/${room.id}`
        history.push(`/course/${url}`);
    }

    function roomFunction() {
        return props.rooms.map((room) => {
            if (room.course === props.id) {
                return (
                    <div>
                       
                        <button className="roomButton" onClick={() => test(room)}  >
                            {room.id}
                        </button>
                    </div>
                );
            } else {
                return (<h3>no room available now </h3>)
            }
        })
    }
    
    return (
        <div>
          <h3>room available now </h3>
          {roomFunction()}
        </div>
    )
};

export default OpenRooms;

