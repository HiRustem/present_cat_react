import { ReactNode } from "react";
import styles from "./Scene.module.scss";

interface IScene {
  children: ReactNode;
}

const Scene = ({ children }: IScene) => {
  return <div className={styles.scene}>{children}</div>;
};

export default Scene;
