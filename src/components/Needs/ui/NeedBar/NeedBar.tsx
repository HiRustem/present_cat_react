import clsx from "clsx";
import styles from "./NeedBar.module.scss";
import { INeedBar } from "../../model/types";

const NeedBar = ({ label, value, handler }: INeedBar) => {
  const valueString = `${value} / 100`;

  const barWidth: { [key: string]: string } = { "--bar_width": `${value}%` };

  return (
    <div className={styles.container} style={barWidth}>
      <p className={styles.label}>{label}</p>

      <div
        className={clsx(styles.barWrapper, {
          [styles.red]: value < 50,
          [styles.yellow]: value >= 50 && value < 80,
          [styles.green]: value >= 80,
        })}
      >
        <div className={styles.bar}></div>

        <p className={styles.value}>{valueString}</p>
      </div>

      {handler && handler.condition && value !== 100 && (
        <button className={styles.button} onClick={handler.onClick}>
          {handler.text}
        </button>
      )}
    </div>
  );
};

export default NeedBar;
