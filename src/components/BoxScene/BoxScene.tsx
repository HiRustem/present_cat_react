import Box from "./ui/Box/Box";
import Cap from "./ui/Cap/Cap";

import boxMeowSrc from "@/assets/audio/box_meow.mp3";

import { useEffect, useRef, useState } from "react";
import {
  boxWrapperKeyframes,
  boxWrapperTiming,
  capOpenKeyframes,
  capOpenTiming,
} from "./model/animation";

import { LottieRefCurrentProps } from "lottie-react";
import styles from "./BoxScene.module.scss";

const BoxScene = () => {
  const [isAnimationDisabled, setIsAnimationDisabled] =
    useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const capRef = useRef<HTMLDivElement>(null);
  const boxMeowRef = useRef<HTMLAudioElement>(null);
  const boxWrapperRef = useRef<HTMLDivElement>(null);
  const catShowAnimationRef = useRef<LottieRefCurrentProps | null>(null);

  const boxOnClick = () => {
    if (isAnimationDisabled) return;

    setIsAnimationDisabled(true);

    const capAnimation = capRef.current?.animate(
      capOpenKeyframes,
      capOpenTiming
    );

    if (capAnimation) {
      capAnimation.onfinish = () => {
        if (capRef.current) capRef.current.style.opacity = "0";

        catShowAnimationRef?.current?.play();
      };
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (boxMeowRef.current && boxWrapperRef.current) {
        boxWrapperRef.current.animate(boxWrapperKeyframes, boxWrapperTiming);
        boxMeowRef.current?.play();
      }
    }, 5000);

    if (isAnimationDisabled) clearInterval(timerId);

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
      <Box ref={catShowAnimationRef} />

      <div>asdadasdadas</div>

      <audio ref={boxMeowRef} src={boxMeowSrc}></audio>
    </div>
  );
};

export default BoxScene;
