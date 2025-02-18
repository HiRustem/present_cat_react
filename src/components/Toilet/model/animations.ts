export const toiletHideKeyframes = [
  { transform: "translateY(0px)" },
  { transform: "translateY(20px)" },
  { transform: "translateY(40px)" },
  { transform: "translateY(60px)" },
  { transform: "translateY(80px)" },
  { transform: "translateY(100px)" },
  { transform: "translateY(120px)" },
];

export const toiletAppearKeyframes = [
  { transform: "translateY(120px)" },
  { transform: "translateY(100px)" },
  { transform: "translateY(80px)" },
  { transform: "translateY(60px)" },
  { transform: "translateY(40px)" },
  { transform: "translateY(20px)" },
  { transform: "translateY(0px)" },
];

export const toiletAppearAndHideTiming = {
  duration: 1000,
  easing: "ease-in",
  fill: "forwards" as FillMode,
};
