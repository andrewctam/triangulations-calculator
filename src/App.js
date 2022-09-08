import './App.css';
import Point from './Point';
import Edge from './Edge';
import { useState, useRef } from "react";

function App() {
    const [points, setPoints] = useState([]);
    const [edges, setEdges] = useState([]);
    const [counter, setCounter] = useState(0)
    const [building, setBuilding] = useState(true);

    const closePolygon = () => {
        setEdges([...edges, {start: counter - 1, end: 0}]);
        setBuilding(false)
    }
    
    const createPoint = (e) => {
        if (!building)
            return;

        const x = e.nativeEvent.offsetX - 8
        const y = e.nativeEvent.offsetY - 8
        setPoints([...points, {x: x, y: y}]);

        if (points.length > 0) {
            setEdges([...edges, {start: counter, end: counter - 1}])
        }

        setCounter(counter + 1);
    }

    return (
        <div onClick={createPoint} className={`relative w-full h-screen select-none bg-${building ? "slate-300":"slate-500"}`}>
            <h1 className="text-center text-xl">Triangulation Calculator</h1>
            <p className="text-center">Click to add points to the polygon!</p>
            {points.map((point, i) => <Point 
                id = {i} 
                key = {"vertex" + i} 
                x = {point.x}
                y = {point.y} 
                points = {points}
                closePolygon = {closePolygon}/>)}

            {edges.map((edge, i) => <Edge
                    key = {"edge" + i}
                    x1 = {points[edge.start].x + 8}
                    x2 = {points[edge.end].x + 8}
                    y1 = {points[edge.start].y + 8}
                    y2 = {points[edge.end].y + 8}
            />)}
            
        </div>
    );
}

export default App;
