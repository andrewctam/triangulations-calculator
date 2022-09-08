import { useState } from "react";
const Point = (props) => {

    const handleClick = (e) => {
        e.stopPropagation();
        if (props.id === 0)
            props.closePolygon();
        else
            alert("To close the polygon, click on your first vertex.")
    }
return <div onClick = {handleClick} className = {`w-4 h-4 z-10 rounded-xl bg-black absolute`} style = {{left: props.x + "px", top: props.y + "px"}}>
    </div>
}


export default Point;