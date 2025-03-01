import { useEffect } from "react";
// Framer-Motion
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function Counter({ targetNumber }) {
  const count = useMotionValue(0);
  const value = useTransform(count, (latest) =>
    latest.toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
  const controls = animate(count, targetNumber, { duration: 1 });

  //   useEffect(() => {
  //     controls.start({ value: targetNumber, transition: { duration: 2 } });
  //   }, [controls, targetNumber]);

  return <motion.span animate={controls}>{value}</motion.span>;
}
