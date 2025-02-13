import Box from "./ui/Box/Box";
import Cap from "./ui/Cap/Cap";

import boxMeowSrc from "@/assets/audio/box_meow.mp3";

import { useEffect, useRef, useState } from "react";

import styles from "./BoxScene.module.scss";

const boxWrapperKeyframes = [
  { transform: "translate(0, 0) rotate(0deg)" },
  { transform: "translate(5px, 5px) rotate(5deg)" },
  { transform: "translate(0, 0) rotate(0deg)" },
  { transform: "translate(-5px, 5px) rotate(-5deg)" },
  { transform: "translate(0, 0) rotate(0deg)" },
];

const boxWrapperTiming = {
  duration: 200,
  iterations: 3,
};

const BoxScene = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const boxMeowRef = useRef<HTMLAudioElement>(null);
  const boxWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (boxMeowRef.current && boxWrapperRef.current) {
        boxWrapperRef.current.animate(boxWrapperKeyframes, boxWrapperTiming);
        boxMeowRef.current?.play();
      }
    }, 5000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div
      ref={boxWrapperRef}
      className={styles.wrapper}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Cap isHovered={isHovered} />
      <Box />

      <audio ref={boxMeowRef} src={boxMeowSrc}></audio>
    </div>
  );
};

export default BoxScene;
