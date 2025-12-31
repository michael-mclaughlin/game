import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import styled, { css, keyframes } from "styled-components";
import DivWrapper from "../layout/DivWrapper.tsx";
import SectionWrapper from "../layout/SectionWrapper.tsx";
import Timer from "../custom/Timer.tsx";
import { getRandomInt } from "../../utils/utils.tsx";
import { generateRandomUUID } from "../../utils/utils.tsx";
import '../../styles/bubble.css';

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

interface ItemProps {
  id: string;
  $paused?: boolean;
  removeDiv: (itemId: string | number) => void;
}

const Circle: React.FC<CircleProps> = (props: CircleProps) => {
  const { id } = props;
  const [bubbles, setBubbles] = useState<ReactNode[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [xPosition, setXPosition] = useState<number>(0);
  const divRefs = useRef<HTMLDivElement>(null);

  let str = getRandomInt(10);

  const newUUID = generateRandomUUID();

  const removeDiv = useCallback((itemId: string | number) => {
    setBubbles(bubbles.filter((id) => id !== itemId));
  }, [bubbles]);

  const addDiv = useCallback(() => {
    const Item: React.FC<ItemProps> = (props: ItemProps) => {
      const [isVisible, setIsVisible] = useState<boolean>(true);
      const { id } = props;

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

      const scoreClickHandler = useCallback(() => {
        setPoints((prevPoints) => prevPoints + theScore());
        setIsVisible(false);
      }, [theScore]);

      return (
        <BubbleParent>
          {isVisible && (
            <BubbleWrapper>
              <Bubble
                key={id}
                ref={divRefs}
                id={id}
                className={`${'animate-bubble bubble'}`}
                onClick={scoreClickHandler}
                style={{
                  width: str,
                  height: str,
                  right: xPosition + 'px',
                }}
              />
            </BubbleWrapper>
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
    xPosition,
  ]);

  useEffect(() => {
    const bubbleXPositionCreate = () => {
      if (divRefs.current) {
        const windowWidth = window.innerWidth;
        const xPos = Math.floor(Math.random() * windowWidth );
        setXPosition(xPos);
      }
    };
    const interval = setInterval(() => {
      addDiv();
      bubbleXPositionCreate();
    }, 1000);
    return () => clearInterval(interval);
  }, [
    str,
    id,
    bubbles,
    addDiv,
    xPosition,
  ]);

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
    <SectionWrapper>
      <DivWrapper
      >
        <Timer />
        <h2>{points}</h2>
        <button onClick={toggleAnimation}>
          {isPaused ? "Pause Animation" : "Resume Animation "}
        </button>
      </DivWrapper>
      <BubbleContainer>
        {isPaused && !isOver && [...bubbles]}
      </BubbleContainer>
    </SectionWrapper>
  );
};

const xMotion = keyframes`
  100% {
    transform: translateX(calc(100vw - 100%));
  }
`;

const yMotion = keyframes`
100% {
  transform: translateY(calc(80vh - 100%));
}
`;

const bubbleSizeAnimation = keyframes`
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  20% {
    -webkit-transform: scaleY(0.95) scaleX(1.05);
    transform: scaleY(0.95) scaleX(1.05);
  }
  48% {
    -webkit-transform: scaleY(1.1) scaleX(0.9);
    transform: scaleY(1.1) scaleX(0.9); 
  }
  68% {
    -webkit-transform: scaleY(0.98) scaleX(1.02);
    transform: scaleY(0.98) scaleX(1.02); 
  }
  80% {
    -webkit-transform: scaleY(1.02) scaleX(0.98);
    transform: scaleY(1.02) scaleX(0.98); 
  }
  97%, 100% {
    -webkit-transform: scale(1);
    transform: scale(1); 
  }
`;

const xAnimation = css`
  animation: ${xMotion} 14s linear infinite;
`;

const yAnimation = css`
  animation: ${yMotion} 4s linear infinite alternate;
`;

const bubbleShapeAnimation = css`
  animation: ${bubbleSizeAnimation} 2s ease-in-out infinite alternate;
`;

const BubbleContainer = styled.div`
`;

const BubbleWrapper = styled.div`
${bubbleShapeAnimation}
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
animation-play-state: ${(props) => (props.$paused ? 'paused' : 'running')};
box-shadow: -1px -1px 5px rgb(41 169 139 / 28%);
border-left: 2px solid white;
border-right: 3px solid #7b027747;
`;

export default Circle;
