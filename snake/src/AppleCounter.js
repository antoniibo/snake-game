import { useState } from 'react';

const useAppleCount = () => {
  const [appleCount, setAppleCount] = useState(0); 
  const [bestResult, setBestResult] = useState(0); 

  const incrementAppleCount = () => {
    const newCount = appleCount + 1;
    setAppleCount(newCount);
    if (newCount > bestResult) {
      setBestResult(newCount);
    }
  };

  const resetAppleCount = () => {
    setAppleCount(0);
  };

  return { appleCount, bestResult, incrementAppleCount, resetAppleCount };
};

export default useAppleCount;