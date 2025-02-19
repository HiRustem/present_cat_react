import { useShallow } from "zustand/shallow";
import useCatStore from "../Cat/model/store";
import styles from "./Needs.module.scss";
import NeedBar from "./ui/NeedBar/NeedBar";
import clsx from "clsx";
import { INeedBar } from "./model/types";
import { RefObject, useMemo, useRef } from "react";
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
import peeSrc from "@/assets/audio/cat_pee.mp3";
import feedSrc from "@/assets/audio/cat_feed.mp3";

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
                feedRef.current?.play();

                feed(() => {
                  if (feedRef.current) {
                    feedRef.current?.pause();
                    feedRef.current.currentTime = 0;
                  }

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
                peeRef.current?.play();

                pee(() => {
                  if (peeRef.current) {
                    peeRef.current?.pause();
                    peeRef.current.currentTime = 0;
                  }

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

  const feedRef = useRef<HTMLAudioElement>(null);
  const peeRef = useRef<HTMLAudioElement>(null);

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

      <audio ref={feedRef} src={feedSrc} loop={true}></audio>
      <audio ref={peeRef} src={peeSrc} loop={true}></audio>
    </div>
  );
};

export default Needs;
