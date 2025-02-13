import { useShallow } from "zustand/shallow";

import useAppStore from "@/pages/MainPage/model/store";

import styles from "./StartScene.module.scss";

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
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={startHandler}>
        Начать
      </button>
    </div>
  );
};

export default StartScene;
