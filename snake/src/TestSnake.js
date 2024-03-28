import React, { useState, useEffect, useCallback } from 'react';
import Apple from './Apple';
import Snake from './Snake';

const TestSnake = ({appleCount, incrementAppleCount,resetAppleCount }) => {
    const gridSize = 20;
  
    const generateRandomPosition = () => {
        return {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        };
    };

    const endGame = useCallback(() => {
        setIsGameRunning(false);
        alert('Game Over!');
        setSnake([{ x: 9, y: 9 }]);
        setDirection('down');
        setApple(generateRandomPosition());
        resetAppleCount();
    }, [resetAppleCount]);

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [snake, setSnake] = useState([{ x: 9, y: 9 }]);
    const [direction, setDirection] = useState('down');
    const [apple, setApple] = useState(generateRandomPosition());
   
    useEffect(() => {
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
    }, [snake, gridSize, endGame]);

    const checkAppleCollision = useCallback((newHead) => {
        let newSnake = [...snake]; 
    
        if (newHead.x === apple.x && newHead.y === apple.y) {
            setApple(generateRandomPosition());
            newSnake.push(newSnake[newSnake.length - 1]);
            incrementAppleCount()
        }
    
        for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i] = { ...newSnake[i - 1] };
        }
        newSnake[0] = newHead; 
    
        setSnake(newSnake); 
    }, [snake, apple, incrementAppleCount]);

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
                checkAppleCollision(newHead);
            }, 500);
        }
    
        return () => {
            clearInterval(gameInterval);
        };
    }, [isGameRunning, direction, snake, gridSize, endGame, checkAppleCollision]);

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
                    <Snake segments={snake} />
                    <Apple x={apple.x} y={apple.y} />
                </div>
            ) : (
                <button onClick={startGame}>Start</button>
            )}
        </div>
    );
};

export default TestSnake;