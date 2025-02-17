import { useRef } from "react";
import Scene from "../Scene/Scene";
import styles from "./Toilet.module.scss";
import clsx from "clsx";

interface IToilet {
  className?: string;
}

const Toilet = ({ className }: IToilet) => {
  const toiletRef = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <Scene className={styles.scene}>
        <div ref={toiletRef} className={styles.toilet}>
          <div className={clsx(styles.content, styles.front)}></div>
          <div className={clsx(styles.content, styles.back)}></div>
          <div className={clsx(styles.content, styles.left)}></div>
          <div className={clsx(styles.content, styles.right)}></div>
          <div className={clsx(styles.content, styles.bottom)}></div>
        </div>
      </Scene>
    </div>
  );
};

export default Toilet;
