import { BoxScene } from "@/components";
import styles from "./MainPage.module.scss";
import useAppStore from "./model/store";
import { useShallow } from "zustand/shallow";
import StartScene from "@/components/StartScreen/StartScene";
import MainScene from "@/components/MainScene/MainScene";

const MainPage = () => {
  const { isStarted, isShowBox, isShowMainScene } = useAppStore(
    useShallow((state) => ({
      isStarted: state.isStarted,
      isShowBox: state.isShowBox,
      isShowMainScene: state.isShowMainScene,
    }))
  );

  return (
    <div className={styles.page}>
      {!isStarted && <StartScene />}

      {isShowBox && <BoxScene />}

      {isShowMainScene && <MainScene />}
    </div>
  );
};

export default MainPage;
