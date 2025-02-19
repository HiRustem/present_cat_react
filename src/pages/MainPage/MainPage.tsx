import { BoxScene } from "@/components";
import styles from "./MainPage.module.scss";
import useAppStore from "./model/store";
import { useShallow } from "zustand/shallow";
import StartScene from "@/components/StartScreen/StartScene";
import MainScene from "@/components/MainScene/MainScene";
import useCatStore from "@/components/Cat/model/store";
import { useEffect, useRef } from "react";
import { goodPhrases } from "@/components/Cat/model/phrases";
import {
  getCurrentData,
  getDifferenceInHours,
  setIsFirst,
  setLastPoints,
} from "@/pages/MainPage/lib/local-storage";
import backgroundMusicSrc from "@/assets/audio/background_music.mp3";

const MainPage = () => {
  const { isStarted, isShowBox, isShowMainScene } = useAppStore(
    useShallow((state) => ({
      isStarted: state.isStarted,
      isShowBox: state.isShowBox,
      isShowMainScene: state.isShowMainScene,
    }))
  );

  const { currentAction, setValue } = useCatStore(
    useShallow((state) => ({
      currentAction: state.currentAction,
      setValue: state.setValue,
    }))
  );

  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentAction !== "sitting") return;

    const timerId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * goodPhrases.length);

      setValue(
        "catEmotion",
        <span className={styles.phrase}>{goodPhrases[randomIndex]}</span>
      );
    }, 5000);

    if (currentAction !== "sitting") setValue("catEmotion", null);

    return () => clearInterval(timerId);
  }, [currentAction]);

  useEffect(() => {
    if (!isStarted) return;

    const { isFirst, lastPointsAndDates } = getCurrentData();

    if (isFirst === null) {
      setIsFirst();
    }

    if (lastPointsAndDates === null) {
      setValue("hungryPoints", 50);
      setValue("happinessPoints", 50);
      setValue("peePoints", 50);

      setLastPoints("pee", 50);
      setLastPoints("feed", 50);
      setLastPoints("happy", 50);
    } else {
      const pee = lastPointsAndDates.pee;
      const feed = lastPointsAndDates.feed;
      const happy = lastPointsAndDates.happy;

      if (pee) {
        const lastPoints = pee.points;
        const lastTimestamp = pee.date;
        const differenceInHours = getDifferenceInHours(lastTimestamp);

        const newPoints = lastPoints - differenceInHours * 10;

        setValue("peePoints", newPoints > 0 ? newPoints : 0);
        setLastPoints("pee", newPoints > 0 ? newPoints : 0);
      }

      if (feed) {
        const lastPoints = feed.points;
        const lastTimestamp = feed.date;
        const differenceInHours = getDifferenceInHours(lastTimestamp);

        const newPoints = lastPoints - differenceInHours * 10;

        setValue("hungryPoints", newPoints > 0 ? newPoints : 0);
        setLastPoints("feed", newPoints > 0 ? newPoints : 0);
      }

      if (happy) {
        const lastPoints = happy.points;
        const lastTimestamp = happy.date;
        const differenceInHours = getDifferenceInHours(lastTimestamp);

        const newPoints = lastPoints - differenceInHours * 10;

        setValue("happinessPoints", newPoints > 0 ? newPoints : 0);
        setLastPoints("happy", newPoints > 0 ? newPoints : 0);
      }
    }

    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.1;
      backgroundMusicRef.current?.play();
    }
  }, [isStarted]);

  return (
    <div className={styles.page}>
      {!isStarted && <StartScene />}

      {isShowBox && <BoxScene />}

      {isShowMainScene && <MainScene />}

      <audio
        ref={backgroundMusicRef}
        src={backgroundMusicSrc}
        loop={true}
      ></audio>
    </div>
  );
};

export default MainPage;
