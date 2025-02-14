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
