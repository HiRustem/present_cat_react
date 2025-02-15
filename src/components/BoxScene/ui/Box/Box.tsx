import clsx from "clsx";

import styles from "./Box.module.scss";
import Scene from "@/components/Scene/Scene";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

import catShowAndHideAnimation from "@/assets/cat_animations/cat_show_and_hide_animation.json";
import { MutableRefObject, useRef } from "react";
import {
  boxHideKeyframes,
  boxHideTiming,
  catAppearenceKeyframes,
  catAppearenceTiming,
} from "../../model/animation";

import catMainAnimation from "@/assets/cat_animations/cat_main_animation.json";
import useAppStore from "@/pages/MainPage/model/store";

interface IBox {
  catShowAnimationRef: MutableRefObject<LottieRefCurrentProps | null>;
}

const Box = ({ catShowAnimationRef }: IBox) => {
  const boxRef = useRef<HTMLDivElement>(null);
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
        if (boxRef.current) boxRef.current.style.opacity = "0";
        showMainScene();
      };
    };
  };

  return (
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
          ref={catAnimationWrapperRef}
          className={styles.mainAnimation}
          animationData={catMainAnimation}
          autoplay={false}
        />
      </div>
    </Scene>
  );
};

export default Box;
