import React, { useState, useEffect } from 'react';


const TestSnake = () => {
    const gridSize = 20;
  
    const generateRandomPosition = () => {
        return {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        };
    };
    const endGame = () => {
        setIsGameRunning(false);
        alert('Game Over!');
        setSnake([{ x: 9, y: 9 }]);
        setDirection('down');
        setApple(generateRandomPosition());
      };
      const isSnakeCollision = (head) => {
        return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
      };

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [snake, setSnake] = useState([{ x: 9, y: 9 }]);
    const [direction, setDirection] = useState('down');
    const [apple, setApple] = useState(generateRandomPosition());
   
  
    const checkAppleCollision = (newHead) => {
      if (newHead.x === apple.x && newHead.y === apple.y) {
          setApple(generateRandomPosition());
          snake.push(snake[snake.length - 1]); // Add the last segment directly
      }
      setSnake([newHead, ...snake.slice(1)]); // Update snake with new head
  };
  
    useEffect(() => {
      const generateRandomPosition = () => {
        const position = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
        };
        console.log('Generated position:', position);
        return position;
    };
        const endGame = () => {
            setIsGameRunning(false);
            alert('Game Over!');
            setSnake([{ x: 9, y: 9 }]);
            setDirection('down');
            setApple(generateRandomPosition());
          };
          const isSnakeCollision = (head) => {
            return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
          };
      const checkCollision = () => {
        const head = snake[0];
        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize ||
          isSnakeCollision(head)
        ) {
          endGame();
        }
      };
  
      checkCollision();
    }, [snake, endGame, gridSize, isSnakeCollision]);
  
    useEffect(() => {
      let gameInterval;
    
      if (isGameRunning) {
        gameInterval = setInterval(() => {
          const [head, ...tail] = snake; 
          const newHead = {
            x: head.x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0),
            y: head.y + (direction === 'up' ? -1 : direction === 'down' ? 1 : 0),
          };
          if (
            newHead.x < 0 ||
            newHead.x >= gridSize ||
            newHead.y < 0 ||
            newHead.y >= gridSize ||
            tail.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
          ) {
            endGame();
            return;
          }
          setSnake([newHead, ...tail.slice(0, -1)]);
          checkAppleCollision(newHead, tail);
        }, 500);
      }
    
      return () => {
        clearInterval(gameInterval);
      };
    }, [isGameRunning, direction, apple, snake, endGame]);

    const startGame = () => {
      setIsGameRunning(true);
    };
  
  
   
  
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowRight':
          setDirection('right');
          break;
        default:
          break;
      }
    };
  
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);
  
    const gridStyle = {
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    };
  
    return (
      <div>
        {isGameRunning ? (
          <div style={gridStyle} className="snake-container">
            {snake?.map((segment, index) => (
    <div
        key={index}
        className="snake-segment"
        style={{
            gridColumn: segment.x + 1,
            gridRow: segment.y + 1,
            backgroundColor: 'green',
            border: '1px solid #fff',
        }}
    ></div>
))}
            <div
              className="apple"
              style={{
                gridColumn: apple.x + 1,
                gridRow: apple.y + 1,
                backgroundColor: 'red',
                border: '1px solid #fff',
              }}
            ></div>
          </div>
        ) : (
          <button onClick={startGame}>Start</button>
        )}
      </div>
    );
  };
  
  export default TestSnake;