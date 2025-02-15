import Scene from "../Scene/Scene";
import Lottie from "lottie-react";

import catMainAnimation from "@/assets/cat_animations/cat_main_animation.json";

import styles from "./MainScene.module.scss";

const MainScene = () => {
  return (
    <Scene className={styles.scene}>
      <Lottie
        className={styles.mainAnimation}
        animationData={catMainAnimation}
        autoplay={true}
        loop={true}
      />
    </Scene>
  );
};

export default MainScene;
