import { useEffect, useRef, useState } from 'react';

const useTimer = (initial: number) => {
  const [second, setSecond] = useState(initial);
  const [isPaused, setIsPaused] = useState(true);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    if (isPaused) return;
    startTime.current = setInterval(() => {
      setSecond(prev => {
        if (prev <= 1) {
          if (startTime.current) {
            clearInterval(startTime.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (startTime.current) {
        clearInterval(startTime.current);
      }
    };
  }, [isPaused]);

  const reset = () => setSecond(initial);

  return { second, setSecond, isPaused, setIsPaused, reset };
};

export default useTimer;
