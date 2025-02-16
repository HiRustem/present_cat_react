import { useShallow } from "zustand/shallow";
import useCatStore from "../Cat/model/store";
import styles from "./Needs.module.scss";
import NeedBar from "./ui/NeedBar/NeedBar";
import clsx from "clsx";

interface INeeds {
  className?: string;
}

const Needs = ({ className }: INeeds) => {
  const { hungryPoints, happinessPoints, peePoints } = useCatStore(
    useShallow((state) => ({
      hungryPoints: state.hungryPoints,
      happinessPoints: state.happinessPoints,
      peePoints: state.peePoints,
    }))
  );

  const needs = [
    {
      label: "Голод",
      value: hungryPoints,
    },
    {
      label: "Счастье",
      value: happinessPoints,
    },
    {
      label: "Туалет",
      value: peePoints,
    },
  ];

  return (
    <div className={clsx(styles.needs, className)}>
      {needs.map((item) => (
        <NeedBar key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default Needs;
