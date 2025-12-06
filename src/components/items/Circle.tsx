import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import styled, { css, keyframes } from "styled-components";

interface CircleProps {
  children?: ReactElement;
  customClass?: string;
  id: string;
}

interface BubbleProps {
  $paused?: boolean;
  animationDuration?: string;
  animationTimingFunction?: string;
}

const Timer: React.FC = () => {
  const initialTime = 120;
  const [secondsRemaining, setSecondsRemaining] = useState(initialTime);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start the countdown interval
    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prevTime) => prevTime - 1);
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
      setSecondsRemaining(0); // Ensure it displays 0
    }
  }, [secondsRemaining]);


  return (
    <h1>Countdown: {secondsRemaining} seconds</h1>
  );
};

const Circle: React.FC<CircleProps> = (props: CircleProps) => {
  const { id } = props;
  const [bubbles, setBubbles] = useState<ReactNode[]>([]);
  const [isBgColor, setBgColor] = useState<string>("pink");
  const [isBorderColor, setIsBorderColor] = useState<string>("#2b78e4");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [isOver, setIsOver] = useState<boolean>(false);
  const divRefs = useRef<HTMLDivElement>(null);

  if (isBgColor === 'pink' && bubbles.length === 1) {
    setBgColor('red')
  }
  function getRandomInt(max: number) {
    return Math.floor(Math.ceil(Math.random() * max) * 10);
  }
  let str = getRandomInt(10);

  function generateRandomUUID(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    } else {
      // Fallback for environments where crypto.randomUUID is not available
      // This method is less secure and should only be used as a last resort
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    }
  }

  const newUUID = generateRandomUUID();

  const generateRandomHexColor = () => {
    // Generate a random number between 0 and 16777215 (FFFFFF in hex)
    const randomColorNumber = Math.floor(Math.random() * 16777215);

    // Convert the number to a hexadecimal string
    let hex = randomColorNumber.toString(16);

    // Pad with leading zeros if the hex string is less than 6 characters
    return (hex = `#${hex.padStart(6, "0")}`);
  };

  const removeDiv = useCallback((itemId: string | number) => {
    setBubbles(bubbles.filter((id) => id !== itemId));
  }, [bubbles]);

  const addDiv = useCallback(() => {
    const Item = ({ id, $paused, removeDiv }) => {
      const [isVisible, setIsVisible] = useState<boolean>(true);

      const theScore = useCallback(() => {
        let score: number = 0;

        switch (str) {
          case 100:
            return score = 1;
          case 90:
            return score = 2;
          case 80:
            return score = 3;
          case 70:
            return score = 4;
          case 60:
            return score = 5;
          case 50:
            return score = 6;
          case 40:
            return score = 7;
          case 30:
            return score = 8;
          case 20:
            return score = 9;
          case 10:
            return score = 10;
          default:
            return score;
        }
      }, []);

      const clickHandler = useCallback(() => {
        setPoints((prevPoints) => prevPoints + theScore());
        setIsVisible(false);
      }, [theScore]);

      return (
        <BubbleParent>
          {isVisible && (
            <Bubble
              key={id}
              ref={divRefs}
              id={id}
              className={`${"animate-bubble"}`}
              onClick={clickHandler}
              style={{
                width: str,
                height: str,
                backgroundColor: `${isBgColor}`,
                border: `10px solid ${isBorderColor}`,
              }}
              animationDuration="2s"
            >
              <div>{theScore()}</div>
            </Bubble>
          )}
        </BubbleParent>
      );
    };
    setBubbles((prev) => [
      ...prev,
      <Item
        key={newUUID}
        id={newUUID}
        removeDiv={removeDiv}
        $paused={isPaused}
      />,
    ]);
  }, [
    newUUID,
    isPaused,
    removeDiv,
    str,
    isBgColor,
    isBorderColor,
  ]);

  useEffect(() => {
    const bubbleCreate = () => {
      if (divRefs.current) {
        setBgColor(generateRandomHexColor());
        setIsBorderColor(generateRandomHexColor());
      }
    };

    const interval = setInterval(() => {
      addDiv();
      bubbleCreate();
    }, 2000);
    return () => clearInterval(interval);
  }, [str, id, bubbles, addDiv, isBorderColor, isBgColor]);

  const toggleAnimation = () => {
    setIsPaused(!isPaused);
  };

  const gameOverAndStop = (): void => {
    setTimeout(() => {
      setIsOver(!isOver);
      removeDiv(id);
    }, 120000);
  };

  useEffect(() => {
    gameOverAndStop();
    toggleAnimation();
  }, []);

  return (
    <div
    >
      <Timer />
      <h2>{points}</h2>
      <button onClick={toggleAnimation}>
          {isPaused ? "Pause Animation" : "Resume Animation "}
        </button>
      <BubbleContainer>
        {isPaused && !isOver && [...bubbles]}
      </BubbleContainer>
    </div>
  );
};

const xMotion = keyframes`
  100% {
    transform: translateX(calc(100vw - 100%));
  }
`;

const yMotion = keyframes`
100% {
  transform: translateY(calc(100vh - 100%));
}
`;

const xAnimation = css`
  animation: ${xMotion} 10s linear infinite alternate;
`;

const yAnimation = css`
  animation: ${yMotion} 7s linear infinite alternate;
`;

const BubbleContainer = styled.div`
`;

const BubbleParent = styled.div<BubbleProps>`
position: absolute;
${xAnimation}
`;

const Bubble = styled.div<BubbleProps>`
border-radius: 50%;
display: flex;
align-items: center;
justify-content: space-around;
${yAnimation}
animation-fill-mode: forwards;
animation-play-state: ${(props) => (props.$paused ? "paused" : "running")};
box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.7);

`;

export default Circle;
