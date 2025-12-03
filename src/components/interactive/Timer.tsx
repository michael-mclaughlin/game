import React, { useEffect, useState, useRef } from "react"
// import StartModal from "../items/StartModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const StartModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '500px',
        zIndex: 1001,
      }}>
        {children}
        <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
      </div>
    </div>
  );
};


const Timer: React.FC = () => {
  const initialTime = 5;
  const [secondsRemaining, setSecondsRemaining] = useState(initialTime);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start the countdown interval
    intervalRef.current = setInterval(() => {
      setSecondsRemaining(prevTime => prevTime - 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
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
      setIsModalOpen(false); // Open the modal
      setSecondsRemaining(0); // Ensure it displays 0
    }
  }, [secondsRemaining]); 

  const closeModal = () => {
    setIsModalOpen(false);
    // Optional: add logic to restart the timer or handle completion
  };

  return (
    <div>
      <h1>Countdown: {secondsRemaining} seconds</h1>
      <StartModal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Time's Up!</h2>
        <p>The countdown has reached zero and the modal has appeared.</p>
      </StartModal>
    </div>
  );
};

export default Timer;

