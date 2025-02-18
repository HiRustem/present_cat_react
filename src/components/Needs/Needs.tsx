import { useShallow } from "zustand/shallow";
import useCatStore from "../Cat/model/store";
import styles from "./Needs.module.scss";
import NeedBar from "./ui/NeedBar/NeedBar";
import clsx from "clsx";
import { INeedBar } from "./model/types";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  toiletAppearAndHideTiming,
  toiletAppearKeyframes,
  toiletHideKeyframes,
} from "../Toilet/model/animations";
import {
  fishAppearAndHideTiming,
  fishAppearKeyframes,
  fishHideKeyframes,
} from "../MainScene/model/animations";

interface INeeds {
  toiletRef: RefObject<HTMLDivElement>;
  fishRef: RefObject<HTMLDivElement>;
  className?: string;
}

const Needs = ({ toiletRef, fishRef, className }: INeeds) => {
  const needsRef = useRef<HTMLDivElement>(null);

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
            if (fishRef.current) {
              fishRef.current.style.opacity = "1";

              const fishAppearAnimation = fishRef.current.animate(
                fishAppearKeyframes,
                fishAppearAndHideTiming
              );

              fishAppearAnimation.onfinish = () => {
                feed(() => {
                  const fishAnimation = fishRef.current?.animate(
                    fishHideKeyframes,
                    fishAppearAndHideTiming
                  );

                  if (fishAnimation) {
                    fishAnimation.onfinish = () => {
                      if (fishRef.current) {
                        fishRef.current.style.opacity = "0";
                      }
                    };

                    fishAnimation.play();
                  }
                });
              };

              fishAppearAnimation.play();
            }
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
            if (toiletRef.current) {
              toiletRef.current.style.opacity = "1";

              const toiletAppearAnimation = toiletRef.current.animate(
                toiletAppearKeyframes,
                toiletAppearAndHideTiming
              );

              toiletAppearAnimation.onfinish = () => {
                pee(() => {
                  const toiletAnimation = toiletRef.current?.animate(
                    toiletHideKeyframes,
                    toiletAppearAndHideTiming
                  );

                  if (toiletAnimation) {
                    toiletAnimation.onfinish = () => {
                      if (toiletRef.current) {
                        toiletRef.current.style.opacity = "0";
                      }
                    };

                    toiletAnimation.play();
                  }
                });
              };

              toiletAppearAnimation.play();
            }
          },
          text: "В лоток",
          condition: currentAction !== "peeing",
        },
      },
    ];
  }, [
    hungryPoints,
    happinessPoints,
    peePoints,
    currentAction,
    feed,
    pee,
    toiletRef,
  ]);

  return (
    <div ref={needsRef} className={clsx(styles.needs, className)}>
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
