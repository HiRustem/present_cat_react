import { motion, Transition } from "framer-motion";
import useSound from "use-sound";

import Box from "./ui/Box/Box";
import Cap from "./ui/Cap/Cap";

import boxMeow from "@/assets/audio/box_meow.mp3";

import styles from "./BoxScene.module.scss";

const shakeAnimation = {
  x: [0, 5, 0, -5, 0, 5, 0, -5, 0, 5, 0, -5, 0],
  y: [0, 5, 0, -5, 0, 5, 0, -5, 0, 5, 0, -5, 0],
  rotate: [0, 5, 0, -5, 0, 5, 0, -5, 0, 5, 0, -5, 0],
};

const shakeTransition: Transition = {
  duration: 0.6,
  repeatDelay: 3,
  repeat: Infinity,
  ease: "easeOut",
  times: [
    0, 0.083, 0.166, 0.25, 0.333, 0.416, 0.5, 0.583, 0.666, 0.75, 0.833, 0.916,
    1,
  ],
};

const BoxScene = () => {
  const [play] = useSound(boxMeow);

  return (
    <motion.div
      className={styles.wrapper}
      animate={shakeAnimation}
      transition={shakeTransition}
      onAnimationStart={() => {
        play();
      }}
    >
      <Box />
      <Cap />
    </motion.div>
  );
};

export default BoxScene;
