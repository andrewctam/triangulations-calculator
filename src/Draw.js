import Point from './Point';
import Edge from './Edge';
import { useState } from "react";
import { countDiagonals } from './triangulate';

function Draw() {
    const [points, setPoints] = useState([]);
    const [building, setBuilding] = useState(true);

    const createPoint = (e) => {
        if (!building)
            return;

        const x = e.nativeEvent.offsetX - 8
        const y = e.nativeEvent.offsetY - 8
        setPoints([...points, {x: x, y: y}]);
    }
    
    const closePolygon = () => {            
        setBuilding(false)
    }

    const undo = (e) => {
        if (e.keyCode === 8) {
            if (building)
                setPoints(points.slice(0, points.length - 1));    
            else
                setBuilding(true)
        }
    }

    const edges = []
    for (let i = 0; i < points.length - 1; i++) {
        edges.push(
            <Edge
                key = {"edge" + i}
                id = {i}
                x1 = {points[i].x + 8}
                x2 = {points[i + 1].x + 8}
                y1 = {points[i].y + 8}
                y2 = {points[i + 1].y + 8} />
        )

    }

    if (!building)  {
        edges.push(
            <Edge
                key = {"edge" + points.length}
                id = {points.length}
                x1 = {points[0].x + 8}
                x2 = {points[points.length - 1].x + 8}
                y1 = {points[0].y + 8}
                y2 = {points[points.length - 1].y + 8} 
            />
        )
    }

    return (
        <div onClick={createPoint} onKeyDown = {undo} tabIndex = {-1} className="relative w-full h-screen select-none bg-stone-400">
            {building ? null : 
                <p className = "text-black text-center text-xl p-2 bg-white">{countDiagonals(points) + " triangulations"}</p>
            }

            {points.map((point, i) => 
            <Point 
                id = {i} 
                key = {"vertex" + i} 
                x = {point.x}
                y = {point.y} 
                building = {building}
                closePolygon = {closePolygon}/>)}

            {edges}


            
            
        </div>
    );
}

export default Draw;
