import { useShallow } from "zustand/shallow";
import useCatStore from "../Cat/model/store";
import styles from "./Needs.module.scss";
import NeedBar from "./ui/NeedBar/NeedBar";
import clsx from "clsx";
import { INeedBar } from "./model/types";
import { useMemo } from "react";

interface INeeds {
  className?: string;
}

const Needs = ({ className }: INeeds) => {
  const { hungryPoints, happinessPoints, peePoints, currentAction, feed, pee } =
    useCatStore(
      useShallow((state) => ({
        hungryPoints: state.hungryPoints,
        happinessPoints: state.happinessPoints,
        peePoints: state.peePoints,
        currentAction: state.currentAction,
        feed: state.feed,
        pee: state.pee,
      }))
    );

  const needs: INeedBar[] = useMemo(() => {
    return [
      {
        label: "Голод",
        value: hungryPoints,
        handler: {
          onClick: () => {
            feed();
          },
          text: "Покормить",
          condition: currentAction !== "feeding",
        },
      },
      {
        label: "Счастье",
        value: happinessPoints,
      },
      {
        label: "Туалет",
        value: peePoints,
        handler: {
          onClick: () => {
            pee();
          },
          text: "В лоток",
          condition: currentAction !== "peeing",
        },
      },
    ];
  }, [hungryPoints, happinessPoints, peePoints, currentAction, feed, pee]);

  return (
    <div className={clsx(styles.needs, className)}>
      {needs.map((item) => (
        <NeedBar
          key={item.label}
          label={item.label}
          value={item.value}
          handler={item.handler}
        />
      ))}
    </div>
  );
};

export default Needs;
