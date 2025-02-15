import { useShallow } from "zustand/shallow";

import useAppStore from "@/pages/MainPage/model/store";

import styles from "./StartScene.module.scss";
import Scene from "../Scene/Scene";

const StartScene = () => {
  const { startApp, showBox } = useAppStore(
    useShallow((state) => ({
      startApp: state.startApp,
      showBox: state.showBox,
    }))
  );

  const startHandler = () => {
    startApp();
    showBox();
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
