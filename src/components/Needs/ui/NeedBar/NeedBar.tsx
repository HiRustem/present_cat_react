import styles from "./NeedBar.module.scss";

interface INeedBar {
  label: string;
  value: number;
}

const NeedBar = ({ label, value }: INeedBar) => {
  const valueString = `${value} / 100`;

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>

      <div className={styles.bar}>
        <p className={styles.value}>{valueString}</p>
      </div>
    </div>
  );
};

export default NeedBar;
