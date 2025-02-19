interface ILastPointsAndDates {
  pee?: ILastPointsAndDatesItem;
  feed?: ILastPointsAndDatesItem;
  happy?: ILastPointsAndDatesItem;
}

interface ILastPointsAndDatesItem {
  points: number;
  date: number;
}

interface IGetCurrentData {
  isFirst: boolean | null;
  lastPointsAndDates: ILastPointsAndDates | null;
}

export const getCurrentData = (): IGetCurrentData => {
  const isFirst = localStorage.getItem("isFirst");
  const lastPointsAndDates = localStorage.getItem("lastPointsAndDates");

  return {
    isFirst: isFirst !== null ? Boolean(isFirst) : null,
    lastPointsAndDates: lastPointsAndDates
      ? JSON.parse(lastPointsAndDates)
      : null,
  };
};

export const setIsFirst = () => {
  const isFirst = localStorage.getItem("isFirst");

  if (!isFirst) {
    localStorage.setItem("isFirst", JSON.stringify(false));
  }
};

export const setLastPoints = (
  name: keyof ILastPointsAndDates,
  points: number
) => {
  const lastPointsAndDates = localStorage.getItem("lastPointsAndDates");

  if (!lastPointsAndDates) {
    const lastPoints = JSON.stringify({
      [name]: {
        points,
        date: Date.now(),
      },
    });

    localStorage.setItem("lastPointsAndDates", lastPoints);
  } else {
    const lastPointsAndDatesObject: ILastPointsAndDates =
      JSON.parse(lastPointsAndDates);

    const newLastPointsAndDatesObject = {
      ...lastPointsAndDatesObject,
      [name]: {
        points,
        date: Date.now(),
      },
    };

    localStorage.setItem(
      "lastPointsAndDates",
      JSON.stringify(newLastPointsAndDatesObject)
    );
  }
};

export const getDifferenceInHours = (timestamp: number): number => {
  const now = Date.now();

  return Math.floor((now - timestamp) / (1000 * 60 * 60));
};
