"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  // iOS-style butter smooth easing (highly damped, elegant curve)
  const iosEasing: [number, number, number, number] = [0.25, 1, 0.5, 1];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
      }

      transition={{
        duration: 1,
        delay,
        ease: iosEasing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
