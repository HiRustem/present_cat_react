import { useShallow } from "zustand/shallow";

import useAppStore from "@/pages/MainPage/model/store";

import styles from "./StartScene.module.scss";
import Scene from "../Scene/Scene";
import { getCurrentData } from "@/pages/MainPage/lib/local-storage";

const StartScene = () => {
  const { showMainScene, startApp, showBox } = useAppStore(
    useShallow((state) => ({
      showMainScene: state.showMainScene,
      startApp: state.startApp,
      showBox: state.showBox,
    }))
  );

  const startHandler = () => {
    startApp();

    const { isFirst } = getCurrentData();

    if (!isFirst) {
      showBox();
    } else {
      showMainScene();
    }
  };

  return (
    <Scene>
      <button className={styles.button} onClick={startHandler}>
        Начать
      </button>
    </Scene>
  );
};

export default StartScene;
