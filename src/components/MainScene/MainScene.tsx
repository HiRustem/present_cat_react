import Scene from "../Scene/Scene";
import Lottie from "lottie-react";
import Needs from "../Needs/Needs";
import useCatStore from "../Cat/model/store";
import { useShallow } from "zustand/shallow";
import styles from "./MainScene.module.scss";
import { useGesture } from "react-use-gesture";

const MainScene = () => {
  const { currentConditionAnimation, setHappy, setCurrentCondition } =
    useCatStore(
      useShallow((state) => ({
        currentConditionAnimation: state.currentConditionAnimation,
        setHappy: state.setHappy,
        setCurrentCondition: state.setCurrentCondition,
      }))
    );

  const bind = useGesture({
    onPointerDown: () => {
      setHappy();
    },
    onPointerUp: () => {
      setCurrentCondition();
    },
    onPointerLeave: () => {
      setCurrentCondition();
    },
  });

  return (
    <Scene className={styles.scene}>
      <div {...bind()} className={styles.animationWrapper}>
        <Lottie
          className={styles.mainAnimation}
          animationData={currentConditionAnimation}
          loop={true}
        />
      </div>

      <Needs className={styles.needs} />
    </Scene>
  );
};

export default MainScene;
