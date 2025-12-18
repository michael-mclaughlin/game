
import React, { useState, useEffect, useCallback, useRef } from "react";
import '../../styles/drawer.css';
import DivWrapper from "../layout/DivWrapper.tsx";
import SideDrawer from "./SideDrawer.tsx";
import { theScore } from "../../utils/utils.tsx";

const SideDrawerContainer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [points, setPoints] = useState<number>(0);
  const initialTime = 120;
  const [secondsRemaining, setSecondsRemaining] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, []);

  const latestScore = useCallback(() => {
    setPoints((prevPoints) => prevPoints + theScore());
    if (points >= 10 && secondsRemaining === 100) {
      toggleDrawer();
      const timeOutInterval = setTimeout(() => {
        setIsDrawerOpen(false);
      }, 5000);
      return () => clearTimeout(timeOutInterval);
    };
  }, [toggleDrawer, points, secondsRemaining]);
  
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
    latestScore();
  }, [isDrawerOpen, latestScore]);

  return (
    <>
      <DivWrapper customClass='drawer-wrapper'>
        {/* <button className='open-close-button' onClick={toggleDrawer}>Open Drawer</button> */}
        <SideDrawer customClass='minus-score-clown' isOpen={isDrawerOpen} onClose={toggleDrawer}>
          <DivWrapper customClass='drawer-header'></DivWrapper>
          <h2>Drawer Content</h2>
          <p>This is some content inside the slide-out drawer.</p>
        </SideDrawer>
      </DivWrapper>
    </>
  );
}


export default SideDrawerContainer;


