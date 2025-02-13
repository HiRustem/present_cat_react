import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type IUseAppStoreState = {
  isStarted: boolean;
  isShowBox: boolean;
};

type IUseAppStoreAction = {
  startApp: () => void;
  showBox: () => void;
  setValue: <K extends keyof IUseAppStoreState>(
    fieldName: K,
    fieldValue: IUseAppStoreState[K]
  ) => void;
};

const appStoreDefaultState: IUseAppStoreState = {
  isStarted: false,
  isShowBox: false,
};

const useAppStore = create<IUseAppStoreState & IUseAppStoreAction>()(
  immer((set) => ({
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
