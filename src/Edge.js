
const Edge = (props) => {

    const distance = Math.sqrt(Math.pow(props.x2 - props.x1, 2) + Math.pow(props.y2 - props.y1, 2)) + 5;
    var angle = Math.atan((props.y1 - props.y2) / (props.x1 - props.x2)) * 180 / Math.PI;

    var left = "";
    var top = "";

    if (props.x1 < props.x2) {
        left = props.x1 + "px";
        top = props.y1 + "px";
    } else {
        left = props.x2 + "px";
        top = props.y2 + "px";
    }


    return <div onClick = {(e) => {e.stopPropagation();}} className = {"h-1 z-0 bg-black absolute origin-top-left"} 
        style = {{width: distance + "px", left: left, top: top, 
        transform: `rotate(${angle}deg)`}}>
    </div>




}


export default Edge;