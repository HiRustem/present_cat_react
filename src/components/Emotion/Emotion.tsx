import { ReactNode } from "react";
import styles from "./Emotion.module.scss";

interface IEmotion {
  content: ReactNode;
  className?: string;
}

const Emotion = ({ content, className }: IEmotion) => {
  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <div className={styles.emotion}>{content}</div>

        <div className={styles.bigSphere}></div>

        <div className={styles.smallSphere}></div>
      </div>
    </div>
  );
};

export default Emotion;
