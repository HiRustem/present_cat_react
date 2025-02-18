import Scene from "../Scene/Scene";
import Lottie from "lottie-react";
import Needs from "../Needs/Needs";
import useCatStore from "../Cat/model/store";
import { useShallow } from "zustand/shallow";
import styles from "./MainScene.module.scss";
import { useGesture } from "react-use-gesture";
import Toilet from "../Toilet/Toilet";

const MainScene = () => {
  const {
    currentConditionAnimation,
    setHappy,
    setCurrentCondition,
    incrimentHappiness,
    setNormal,
  } = useCatStore(
    useShallow((state) => ({
      currentConditionAnimation: state.currentConditionAnimation,
      setHappy: state.setHappy,
      setCurrentCondition: state.setCurrentCondition,
      incrimentHappiness: state.incrimentHappiness,
      setNormal: state.setNormal,
    }))
  );

  const bind = useGesture({
    onPointerDown: () => {
      setHappy();
      incrimentHappiness();
    },
    onPointerUp: () => {
      setNormal();
      setCurrentCondition();
    },
    onPointerLeave: () => {
      setNormal();
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

      <div>asdasdasasdas</div>

      <Needs className={styles.needs} />

      <Toilet className={styles.toilet} />
    </Scene>
  );
};

export default MainScene;
