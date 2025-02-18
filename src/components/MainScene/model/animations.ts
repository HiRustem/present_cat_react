export const fishHideKeyframes = [
  { transform: "translate(-70%, 60px)" },
  { transform: "translate(-70%, 80px)" },
  { transform: "translate(-70%, 100px)" },
  { transform: "translate(-70%, 120px)" },
  { transform: "translate(-70%, 140px)" },
];

export const fishAppearKeyframes = [
  { transform: "translate(-70%, 140px)" },
  { transform: "translate(-70%, 120px)" },
  { transform: "translate(-70%, 100px)" },
  { transform: "translate(-70%, 80px)" },
  { transform: "translate(-70%, 60px)" },
];

export const fishAppearAndHideTiming = {
  duration: 1000,
  easing: "ease-in",
  fill: "forwards" as FillMode,
};
