import { LottieRefCurrentProps } from "lottie-react";
import { MutableRefObject, useEffect } from "react";

interface IUseTouchMoveDto {
  isTouchActive: MutableRefObject<boolean>;
  animationRef: MutableRefObject<LottieRefCurrentProps | null>;
  animationContainerRef: MutableRefObject<HTMLDivElement | null>;
  setCurrentCondition: () => void;
}

const useTouchMove = ({
  isTouchActive,
  animationRef,
  animationContainerRef,
  setCurrentCondition,
}: IUseTouchMoveDto) => {
  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      if (!isTouchActive.current) return;

      const touch = event.touches[0];
      const target = animationContainerRef.current;

      if (target && touch) {
        const rect = target.getBoundingClientRect();
        if (
          touch.clientX < rect.left ||
          touch.clientX > rect.right ||
          touch.clientY < rect.top ||
          touch.clientY > rect.bottom
        ) {
          isTouchActive.current = false;
          animationRef.current?.stop();
          setCurrentCondition();
        }
      }
    };

    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isTouchActive, animationRef, animationContainerRef, setCurrentCondition]);
};

export default useTouchMove;
