import clsx from "clsx";

import styles from "./Cap.module.scss";
import { forwardRef } from "react";

interface ICap {
  isHovered: boolean;
}

const Cap = forwardRef<HTMLDivElement, ICap>(({ isHovered }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(styles.scene, { [styles.hovered]: isHovered })}
    >
      <div className={styles.cap}>
        <div className={clsx(styles.content, styles.front)}></div>
        <div className={clsx(styles.content, styles.back)}></div>
        <div className={clsx(styles.content, styles.left)}></div>
        <div className={clsx(styles.content, styles.right)}></div>
        <div className={clsx(styles.content, styles.top)}></div>
      </div>
    </div>
  );
});

export default Cap;
