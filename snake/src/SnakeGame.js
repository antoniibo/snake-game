import React, { useState, useEffect } from 'react';
import Snake from './Snake.js';
import Apple from './Apple.js';

// Helper function to generate a random position for the apple
const generateRandomPosition = () => {
    return {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  };

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [apple, setApple] = useState(generateRandomPosition());
  const [direction, setDirection] = useState('RIGHT');


  // Helper function to move the snake based on the current direction
  const moveSnake = (snake, direction) => {
    return snake.map((segment, index) => {
      if (index === 0) {
        switch (direction) {
          case 'UP':
            return { x: segment.x, y: segment.y - 1 };
          case 'DOWN':
            return { x: segment.x, y: segment.y + 1 };
          case 'LEFT':
            return { x: segment.x - 1, y: segment.y };
          case 'RIGHT':
            return { x: segment.x + 1, y: segment.y };
          default:
            return segment;
        }
      } else {
        return { ...snake[index - 1] };
      }
    });
  };

  // Helper function to check for collisions with walls or itself
  const checkCollision = (snake) => {
    const head = snake[0];

    // Check for collisions with walls
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      return true;
    }

    // Check for collisions with itself
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }

    return false;
  };

  // Helper function to check for collisions with the apple
  const checkAppleCollision = (snake, apple) => {
    const head = snake[0];
    return head.x === apple.x && head.y === apple.y;
  };

  // Helper function to reset the game state
  const resetGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setApple(generateRandomPosition());
    setDirection('RIGHT');
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection((prevDirection) => (prevDirection !== 'DOWN' ? 'UP' : prevDirection));
        break;
      case 'ArrowDown':
        setDirection((prevDirection) => (prevDirection !== 'UP' ? 'DOWN' : prevDirection));
        break;
      case 'ArrowLeft':
        setDirection((prevDirection) => (prevDirection !== 'RIGHT' ? 'LEFT' : prevDirection));
        break;
      case 'ArrowRight':
        setDirection((prevDirection) => (prevDirection !== 'LEFT' ? 'RIGHT' : prevDirection));
        break;
      default:
        break;
    }
    };

    document.addEventListener('keydown', handleKeyPress);

    const gameInterval = setInterval(() => {
      // Move the snake
      const newSnake = moveSnake(snake, direction);

      if (checkCollision(newSnake)) {
        alert('Game over!');
        resetGame();
        return;
      }

      // Check for eating an apple
      if (checkAppleCollision(newSnake, apple)) {
        const newSnakeWithApple = [...newSnake, { x: apple.x, y: apple.y }];
        setSnake(newSnakeWithApple);

        setApple(generateRandomPosition());
      } else {
        setSnake(newSnake);
      }
    }, 200);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [direction, snake, apple]);

  return (
    <div>
      <Snake segments={snake} />
      <Apple position={apple} />
    </div>
  );
};

export default SnakeGame;