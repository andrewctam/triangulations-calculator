import Draw from './Draw';

function App() {
  
    return (
        <div className = "bg-stone-300">
           <h1 className="pt-5 text-center text-3xl ">Triangulation Calculator</h1>
            <p className="pb-5 text-center">Click to add points to the polygon! Press Backspace to undo your last placement.</p>
            <Draw />
        </div>
    );
}

export default App;
