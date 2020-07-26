import React from "react";
import "./App.css";

import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <h1> Yusudoku </h1>
      <div> its simple sudoku app </div>
      <hr></hr>
      <Board></Board>
    </div>
  );
}

export default App;
