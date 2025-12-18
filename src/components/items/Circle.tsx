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
            <Bubble
              key={id}
              ref={divRefs}
              id={id}
              className={`${"animate-bubble"}`}
              onClick={scoreClickHandler}
              style={{
                width: str,
                height: str,
              }}
            />
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
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      addDiv();
    }, 2000);
    return () => clearInterval(interval);
  }, [str, id, bubbles, addDiv]);

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
box-shadow: 0 20px 30px rgba(0, 0, 0, 0.6), inset 0px 10px 30px 5px rgba(255, 255, 255, 0.85);
:after {
  background: -moz-radial-gradient(center, ellipse cover,  rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%); /* FF3.6+ */
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255,255,255,0.5)), color-stop(70%,rgba(255,255,255,0))); /* Chrome,Safari4+ */
    background: -webkit-radial-gradient(center, ellipse cover,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* Chrome10+,Safari5.1+ */
    background: -o-radial-gradient(center, ellipse cover,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* Opera 12+ */
    background: -ms-radial-gradient(center, ellipse cover,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* IE10+ */
    background: radial-gradient(ellipse at center,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
	content: "";
    -webkit-box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
	-moz-box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
	box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);    }
`;

export default Circle;
