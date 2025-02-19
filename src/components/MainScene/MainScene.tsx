import Scene from "../Scene/Scene";
import Lottie from "lottie-react";
import Needs from "../Needs/Needs";
import useCatStore from "../Cat/model/store";
import { useShallow } from "zustand/shallow";
import styles from "./MainScene.module.scss";
import { useGesture } from "react-use-gesture";
import Toilet from "../Toilet/Toilet";
import { useRef } from "react";
import purrSrc from "@/assets/audio/cat_purring.mp3";
import FishImageSvg from "@/assets/images/fish.svg?react";
import Emotion from "../Emotion/Emotion";
import clsx from "clsx";

const MainScene = () => {
  const {
    currentConditionAnimation,
    catEmotion,
    currentAction,
    setHappy,
    setCurrentCondition,
    incrimentHappiness,
    setNormal,
    setValue,
  } = useCatStore(
    useShallow((state) => ({
      currentConditionAnimation: state.currentConditionAnimation,
      catEmotion: state.catEmotion,
      currentAction: state.currentAction,
      setHappy: state.setHappy,
      setCurrentCondition: state.setCurrentCondition,
      incrimentHappiness: state.incrimentHappiness,
      setNormal: state.setNormal,
      setValue: state.setValue,
    }))
  );

  const toiletRef = useRef<HTMLDivElement>(null);
  const fishRef = useRef<HTMLDivElement>(null);
  const purrRef = useRef<HTMLAudioElement>(null);

  const bind = useGesture({
    onPointerDown: () => {
      setValue("catEmotion", null);

      setHappy();
      purrRef.current?.play();
      incrimentHappiness();
    },
    onPointerUp: () => {
      setNormal();
      setCurrentCondition();

      if (purrRef.current) {
        purrRef.current?.pause();
        purrRef.current.currentTime = 0;
      }
    },
    onPointerLeave: () => {
      setNormal();
      setCurrentCondition();

      if (purrRef.current) {
        purrRef.current?.pause();
        purrRef.current.currentTime = 0;
      }
    },
  });

  return (
    <Scene className={styles.scene}>
      <div {...bind()} className={styles.animationWrapper}>
        {catEmotion && (
          <Emotion className={styles.emotion} content={catEmotion} />
        )}

        <Lottie
          className={styles.mainAnimation}
          animationData={currentConditionAnimation}
          loop={true}
        />
      </div>

      <Needs
        toiletRef={toiletRef}
        fishRef={fishRef}
        className={clsx(styles.needs, {
          [styles.hide]: currentAction !== "sitting",
        })}
      />

      <div ref={fishRef} className={styles.fish}>
        <FishImageSvg />
      </div>

      <Toilet ref={toiletRef} className={styles.toilet} />

      <audio ref={purrRef} src={purrSrc} loop={true}></audio>
    </Scene>
  );
};

export default MainScene;
