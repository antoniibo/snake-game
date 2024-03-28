import React from 'react';
import './App.css';
import TestSnake from './TestSnake.js';
import useAppleCount from './AppleCounter';

function App() {
  const { appleCount, bestResult, incrementAppleCount, resetAppleCount } = useAppleCount();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the snake game</h1>
      </header>
      <main>
        <TestSnake appleCount={appleCount} incrementAppleCount={incrementAppleCount} resetAppleCount={resetAppleCount}/>
        
      </main>
      <div className="Counters">
        <p> Apples eaten: {appleCount}</p>
        <p>Best result: {bestResult}</p>
      </div> 
    </div>
  );
}

export default App;
