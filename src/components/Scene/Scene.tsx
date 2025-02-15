import { forwardRef, HTMLAttributes, ReactNode } from "react";
import styles from "./Scene.module.scss";
import clsx from "clsx";

interface IScene extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Scene = forwardRef<HTMLDivElement, IScene>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.scene, className)} {...props}>
        {children}
      </div>
    );
  }
);

export default Scene;
