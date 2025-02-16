import Scene from "../Scene/Scene";
import Lottie from "lottie-react";
import Needs from "../Needs/Needs";
import useCatStore from "../Cat/model/store";
import { useShallow } from "zustand/shallow";
import styles from "./MainScene.module.scss";
import { useState } from "react";

const MainScene = () => {
  const { currentConditionAnimation, setHappy, setCurrentCondition } =
    useCatStore(
      useShallow((state) => ({
        currentConditionAnimation: state.currentConditionAnimation,
        setHappy: state.setHappy,
        setCurrentCondition: state.setCurrentCondition,
      }))
    );

  return (
    <Scene className={styles.scene}>
      <Lottie
        className={styles.mainAnimation}
        animationData={currentConditionAnimation}
        onMouseDown={() => {
          setHappy();
        }}
        onMouseUp={() => {
          setCurrentCondition();
        }}
        onTouchStart={setHappy}
        onTouchMove={setHappy}
        onTouchEnd={setCurrentCondition}
        autoplay={true}
        loop={true}
      />

      <Needs className={styles.needs} />
    </Scene>
  );
};

export default MainScene;
