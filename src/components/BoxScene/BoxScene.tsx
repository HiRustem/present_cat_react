import Box from "./ui/Box/Box";
import Cap from "./ui/Cap/Cap";

import boxMeowSrc from "@/assets/audio/box_meow.mp3";

import { RefObject, useEffect, useRef, useState } from "react";

import styles from "./BoxScene.module.scss";
import {
  boxWrapperKeyframes,
  boxWrapperTiming,
  capOpenKeyframes,
  capOpenTiming,
} from "./model/animation";

const BoxScene = () => {
  const [isAnimationDisabled, setIsAnimationDisabled] =
    useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const capRef = useRef<HTMLDivElement>(null);
  const boxMeowRef = useRef<HTMLAudioElement>(null);
  const boxWrapperRef = useRef<HTMLDivElement>(null);

  const boxOnClick = () => {
    if (isAnimationDisabled) return;

    const capAnimation = capRef.current?.animate(
      capOpenKeyframes,
      capOpenTiming
    );

    if (capAnimation) {
      capAnimation.onfinish = (event) => {
        if (capRef.current !== null) capRef.current.style.opacity = "0";

        setIsAnimationDisabled(true);
      };
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (isAnimationDisabled) return;

      if (boxMeowRef.current && boxWrapperRef.current) {
        boxWrapperRef.current.animate(boxWrapperKeyframes, boxWrapperTiming);
        // boxMeowRef.current?.play();
      }
    }, 5000);

    return () => clearInterval(timerId);
  }, [isAnimationDisabled]);

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
      onClick={boxOnClick}
    >
      <Cap ref={capRef} isHovered={isHovered} />
      <Box />

      <audio ref={boxMeowRef} src={boxMeowSrc}></audio>
    </div>
  );
};

export default BoxScene;
