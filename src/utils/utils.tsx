export function getRandomInt(max: number) {
    return Math.floor(Math.ceil(Math.random() * max) * 10);
};

export function generateRandomUUID(): string {
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
};

export const theScore = () => {
    let score: number = 0;
    let str = getRandomInt(10);

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
};

/** The below code with commented code goes together */

export const generateRandomHexColor = () => {
    // Generate a random number between 0 and 16777215 (FFFFFF in hex)
    const randomColorNumber = Math.floor(Math.random() * 16777215);

    // Convert the number to a hexadecimal string
    let hex = randomColorNumber.toString(16);

    // Pad with leading zeros if the hex string is less than 6 characters
    return (hex = `#${hex.padStart(6, "0")}`);
  };

    // const [isBgColor, setBgColor] = useState<string>("pink");
    // const [isBorderColor, setIsBorderColor] = useState<string>("#2b78e4");

    // export const bubbleCreate = () => {
    //   if (divRefs.current) {
    //     setBgColor(generateRandomHexColor());
    //     setIsBorderColor(generateRandomHexColor());
    //   }
    // };

    // useEffect(() => {
        // const interval = setInterval(() => {
        //   addDiv();
          // bubbleCreate();
        // }, 2000);
        // return () => clearInterval(interval);
    //   }, [str, id, bubbles, addDiv]);
/** The above code with commented code goes together */