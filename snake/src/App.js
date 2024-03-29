import React from 'react';
import './App.css';
import TestSnake from './TestSnake.js';
import useAppleCount from './AppleCounter';

function App() {
  const { appleCount, bestResult, incrementAppleCount, resetAppleCount } = useAppleCount();

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Snake Game</h1>
      </header>
      <div className="Counters">
        <p>Best result: {bestResult}</p>
        <p> Apples eaten: {appleCount}</p>
      </div> 
      <main>
        <TestSnake appleCount={appleCount} incrementAppleCount={incrementAppleCount} resetAppleCount={resetAppleCount}/>
      </main>
    </div>
  );
}

export default App;
