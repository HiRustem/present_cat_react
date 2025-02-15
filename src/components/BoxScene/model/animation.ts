export const boxWrapperKeyframes = [
  { transform: "translate(0, 0) rotate(0deg)" },
  { transform: "translate(5px, 5px) rotate(5deg)" },
  { transform: "translate(0, 0) rotate(0deg)" },
  { transform: "translate(-5px, 5px) rotate(-5deg)" },
  { transform: "translate(0, 0) rotate(0deg)" },
];

export const boxWrapperTiming = {
  duration: 200,
  iterations: 3,
};

export const capOpenKeyframes = [
  { top: "-60px", left: "0px" },
  { top: "-80px", left: "-20px" },
  { top: "-100px", left: "-40px" },
  { top: "-120px", left: "-60px" },
  { top: "-140px", left: "-80px" },
  { top: "-160px", left: "-100px" },
  { top: "-180px", left: "-200px" },
  { top: "-200px", left: "-300px" },
  { top: "-220px", left: "-400px" },
  { top: "-240px", left: "-500px" },
  { top: "-200px", left: "-600px" },
];

export const capOpenTiming = {
  duration: 400,
  easing: "ease-in",
  fill: "forwards" as FillMode,
};

export const catAppearenceKeyframes = [
  { transform: "translateY(100px) rotateY(45deg)", opacity: 0 },
  { transform: "translateY(75px) rotateY(45deg)", opacity: 0 },
  { transform: "translateY(50px) rotateY(45deg)", opacity: 0 },
  { transform: "translateY(25px) rotateY(45deg)", opacity: 0.75 },
  { transform: "translateY(0px) rotateY(45deg)", opacity: 1, height: "200px" },
];

export const catAppearenceTiming = {
  duration: 1000,
  easing: "ease-in",
  fill: "forwards" as FillMode,
};

export const boxHideKeyframes = [
  { transform: "translateY(0px)" },
  { transform: "translateY(20px)" },
  { transform: "translateY(40px)" },
  { transform: "translateY(60px)" },
  { transform: "translateY(80px)" },
  { transform: "translateY(100px)" },
  { transform: "translateY(120px)" },
  { transform: "translateY(140px)" },
  { transform: "translateY(160px)" },
  { transform: "translateY(180px)" },
  { transform: "translateY(200px)" },
  { transform: "translateY(220px)" },
  { transform: "translateY(240px)" },
];

export const boxHideTiming = {
  duration: 2000,
  easing: "ease-in",
  fill: "forwards" as FillMode,
};
