import clsx from "clsx";

import styles from "./Box.module.scss";

const Box = () => {
  return (
    <div className={styles.scene}>
      <div className={styles.box}>
        <div className={clsx(styles.content, styles.front)}></div>
        <div className={clsx(styles.content, styles.back)}></div>
        <div className={clsx(styles.content, styles.left)}></div>
        <div className={clsx(styles.content, styles.right)}></div>
        <div className={clsx(styles.content, styles.bottom)}></div>
      </div>
    </div>
  );
};

export default Box;
