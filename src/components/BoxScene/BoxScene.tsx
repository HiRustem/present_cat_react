import Box from "./ui/Box/Box";
import Cap from "./ui/Cap/Cap";

import boxMeowSrc from "@/assets/audio/box_meow.mp3";

import { useEffect, useRef, useState } from "react";
import {
  boxHideKeyframes,
  boxHideTiming,
  boxWrapperKeyframes,
  boxWrapperTiming,
  capOpenKeyframes,
  capOpenTiming,
  catAppearenceKeyframes,
  catAppearenceTiming,
} from "./model/animation";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import styles from "./BoxScene.module.scss";
import Scene from "../Scene/Scene";
import clsx from "clsx";
import useAppStore from "@/pages/MainPage/model/store";
import catMainAnimation from "@/assets/cat_animations/cat_main_animation.json";
import catShowAndHideAnimation from "@/assets/cat_animations/cat_show_and_hide_animation.json";

const BoxScene = () => {
  const [isAnimationDisabled, setIsAnimationDisabled] =
    useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const capRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxMeowRef = useRef<HTMLAudioElement>(null);
  const boxWrapperRef = useRef<HTMLDivElement>(null);
  const catShowAnimationRef = useRef<LottieRefCurrentProps | null>(null);
  const catAnimationWrapperRef = useRef<HTMLDivElement | null>(null);

  const showMainScene = useAppStore((state) => state.showMainScene);

  const onShowComplete = () => {
    const catAnimation = catAnimationWrapperRef?.current?.animate(
      catAppearenceKeyframes,
      catAppearenceTiming
    );

    if (!catAnimation) return;

    catAnimation.onfinish = () => {
      const boxAnimation = boxRef.current?.animate(
        boxHideKeyframes,
        boxHideTiming
      );

      if (!boxAnimation) return;

      boxAnimation.onfinish = () => {
        if (boxRef.current) {
          boxRef.current.style.opacity = "0";
          showMainScene();
        }
      };
    };
  };

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

      <Scene className={styles.scene}>
        <div ref={boxRef} className={styles.box}>
          <div className={clsx(styles.content, styles.front)}></div>
          <div className={clsx(styles.content, styles.back)}></div>
          <div className={clsx(styles.content, styles.left)}></div>
          <div className={clsx(styles.content, styles.right)}></div>
          <div className={clsx(styles.content, styles.bottom)}></div>
        </div>

        <Lottie
          lottieRef={catShowAnimationRef}
          className={styles.appearAnimation}
          animationData={catShowAndHideAnimation}
          autoplay={false}
          loop={false}
          onComplete={onShowComplete}
        />

        <div ref={catAnimationWrapperRef} className={styles.animationWrapper}>
          <Lottie
            className={styles.mainAnimation}
            animationData={catMainAnimation}
            autoplay={false}
          />
        </div>
      </Scene>

      <audio ref={boxMeowRef} src={boxMeowSrc}></audio>
    </div>
  );
};

export default BoxScene;
