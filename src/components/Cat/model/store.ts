import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CatConditions } from "./type";

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
};

type IUseCatStoreActions = {
  setHappy: () => void;
  setGood: () => void;
  setNormal: () => void;
  setSad: () => void;
  setCurrentCondition: () => void;
};

const catStoreDefaultState: IUseCatStoreState = {
  hungryPoints: 100,
  happinessPoints: 100,
  peePoints: 100,
  condition: "normal",
  currentConditionAnimation: catMainAnimation,
};

const useCatStore = create<IUseCatStoreState & IUseCatStoreActions>()(
  immer((set, get) => ({
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

      if (hungryPoints >= 60 && happinessPoints >= 60 && peePoints >= 60) {
        set({
          condition: "normal",
          currentConditionAnimation: catMainAnimation,
        });

        return;
      }

      if (hungryPoints <= 60 && happinessPoints <= 60 && peePoints <= 60) {
        set({ condition: "sad", currentConditionAnimation: catSadAnimation });

        return;
      }
    },
    ...catStoreDefaultState,
  }))
);

export default useCatStore;
