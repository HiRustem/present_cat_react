import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CatAction, CatConditions } from "./type";

import catMainAnimation from "@/assets/cat_animations/cat_main_animation.json";
import catHappyAnimation from "@/assets/cat_animations/cat_happy_animation.json";
import catSadAnimation from "@/assets/cat_animations/cat_sad_emotion_animation.json";
import catGoodAnimation from "@/assets/cat_animations/cat_good_emotion_animation.json";

type IUseCatStoreState = {
  hungryPoints: number;
  happinessPoints: number;
  peePoints: number;
  condition: CatConditions;
  currentConditionAnimation: unknown;
  currentAction: CatAction;
};

type IUseCatStoreActions = {
  setHappy: () => void;
  setGood: () => void;
  setNormal: () => void;
  setSad: () => void;
  setCurrentCondition: () => void;
  feed: () => void;
  pee: () => void;
  incrimentHappiness: () => void;
};

const catStoreDefaultState: IUseCatStoreState = {
  hungryPoints: 50,
  happinessPoints: 50,
  peePoints: 50,
  condition: "normal",
  currentConditionAnimation: catMainAnimation,
  currentAction: "sitting",
};

const useCatStore = create<IUseCatStoreState & IUseCatStoreActions>()(
  immer((set, get) => ({
    feed: () => {
      set({ currentAction: "feeding" });

      const timerId = setInterval(() => {
        const hungryPoints = get().hungryPoints;

        if (hungryPoints === 100) {
          set({ currentAction: "sitting" });

          clearInterval(timerId);
        }

        if (hungryPoints < 100) {
          const newHungryPoints = hungryPoints + 20;

          set({ hungryPoints: newHungryPoints > 100 ? 100 : newHungryPoints });
        }
      }, 1000);
    },
    pee: () => {
      set({
        currentAction: "peeing",
        condition: "good",
        currentConditionAnimation: catGoodAnimation,
      });

      const timerId = setInterval(() => {
        const peePoints = get().peePoints;

        if (peePoints === 100) {
          const setCurrentCondition = get().setCurrentCondition;

          setCurrentCondition();

          clearInterval(timerId);
        }

        if (peePoints < 100) {
          const newPeePoints = peePoints + 20;

          set({ peePoints: newPeePoints > 100 ? 100 : newPeePoints });
        }
      }, 1000);
    },
    incrimentHappiness: () => {
      const timerId = setInterval(() => {
        const happinessPoints = get().happinessPoints;
        const currentCondition = get().condition;

        if (happinessPoints === 100 || currentCondition !== "happy") {
          clearInterval(timerId);
          return;
        }

        if (happinessPoints < 100) {
          const newHappinessPoints = happinessPoints + 20;

          set({
            happinessPoints:
              newHappinessPoints > 100 ? 100 : newHappinessPoints,
          });
        }
      }, 1000);
    },
    setHappy: () => {
      set({ condition: "happy", currentConditionAnimation: catHappyAnimation });
    },
    setGood: () => {
      set({ condition: "good", currentConditionAnimation: catGoodAnimation });
    },
    setNormal: () => {
      set({ condition: "normal", currentConditionAnimation: catMainAnimation });
    },
    setSad: () => {
      set({ condition: "sad", currentConditionAnimation: catSadAnimation });
    },
    setCurrentCondition: () => {
      const hungryPoints = get().hungryPoints;
      const happinessPoints = get().happinessPoints;
      const peePoints = get().peePoints;

      if (hungryPoints >= 80 && happinessPoints >= 80 && peePoints >= 80) {
        set({ condition: "good", currentConditionAnimation: catGoodAnimation });

        return;
      }

      if (hungryPoints <= 60 || happinessPoints <= 60 || peePoints <= 60) {
        set({ condition: "sad", currentConditionAnimation: catSadAnimation });

        return;
      }

      set({
        condition: "normal",
        currentConditionAnimation: catMainAnimation,
      });
    },
    ...catStoreDefaultState,
  }))
);

export default useCatStore;
