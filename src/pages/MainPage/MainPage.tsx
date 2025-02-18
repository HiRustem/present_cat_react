import { BoxScene } from "@/components";
import styles from "./MainPage.module.scss";
import useAppStore from "./model/store";
import { useShallow } from "zustand/shallow";
import StartScene from "@/components/StartScreen/StartScene";
import MainScene from "@/components/MainScene/MainScene";
import { useEffect } from "react";
import useCatStore from "@/components/Cat/model/store";

const MainPage = () => {
  const { isStarted, isShowBox, isShowMainScene } = useAppStore(
    useShallow((state) => ({
      isStarted: state.isStarted,
      isShowBox: state.isShowBox,
      isShowMainScene: state.isShowMainScene,
    }))
  );

  const { condition, setCurrentCondition } = useCatStore(
    useShallow((state) => ({
      condition: state.condition,
      setCurrentCondition: state.setCurrentCondition,
    }))
  );

  // useEffect(() => {
  //   setCurrentCondition();
  // }, [condition]);

  return (
    <div className={styles.page}>
      {!isStarted && <StartScene />}

      {isShowBox && <BoxScene />}

      {isShowMainScene && <MainScene />}
    </div>
  );
};

export default MainPage;
