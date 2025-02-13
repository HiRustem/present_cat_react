import { BoxScene } from "@/components";
import styles from "./MainPage.module.scss";
import useAppStore from "./model/store";
import { useShallow } from "zustand/shallow";
import StartScene from "@/components/StartScreen/StartScene";

const MainPage = () => {
  const { isStarted, isShowBox } = useAppStore(
    useShallow((state) => ({
      isStarted: state.isStarted,
      isShowBox: state.isShowBox,
    }))
  );

  return (
    <div className={styles.page}>
      {!isStarted && <StartScene />}

      {isShowBox && <BoxScene />}
    </div>
  );
};

export default MainPage;
