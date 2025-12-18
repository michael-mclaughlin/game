import React, { useEffect, useRef, useState } from "react";

const Timer: React.FC = () => {
  const initialTime = 120;
  const [secondsRemaining, setSecondsRemaining] = useState(initialTime);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prevTime: number) => prevTime - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Stop the timer
      }
      setSecondsRemaining(0); // Ensure it displays 0
    }
  }, [secondsRemaining]);


  return (
    <h1>Countdown: {secondsRemaining} seconds</h1>
  );
};

export default Timer;
