import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type IUseAppStoreState = {
  isStarted: boolean;
  isShowBox: boolean;
  isShowMainScene: boolean;
};

type IUseAppStoreActions = {
  startApp: () => void;
  showBox: () => void;
  showMainScene: () => void;
  setValue: <K extends keyof IUseAppStoreState>(
    fieldName: K,
    fieldValue: IUseAppStoreState[K]
  ) => void;
};

const appStoreDefaultState: IUseAppStoreState = {
  isStarted: false,
  isShowBox: false,
  isShowMainScene: false,
};

const useAppStore = create<IUseAppStoreState & IUseAppStoreActions>()(
  immer((set) => ({
    showMainScene: () => {
      set({ isShowMainScene: true, isShowBox: false });
    },
    startApp: () => {
      set({ isStarted: true });
    },
    showBox: () => {
      set({ isShowBox: true });
    },
    setValue: (fieldName, fieldValue) => {
      set({ [fieldName]: fieldValue });
    },
    ...appStoreDefaultState,
  }))
);

export default useAppStore;
